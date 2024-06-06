import "dotenv/config";

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { compile } from "@fileforge/react-print";
import { FileforgeClient } from "@fileforge/client"
import { MyDocument } from "./document";
import type { ReportOption } from "./document";
import { createWriteStream, unlinkSync } from "fs";
import path from "path";
import PDFMerger from "pdf-merger-js";
import { put, del } from "@vercel/blob";

const ff = new FileforgeClient({
  apiKey: process.env.FILEFORGE_API_KEY,
})

export const maxDuration = 60;

export async function GET(request: Request) {
  console.log(request.body);
  const options = await prisma.option.findMany();
  let reportOptions: ReportOption[] = [];
  let pdfEvidence: string[] = [];

  for (let option of options) {
    const evidences = await prisma.evidence.findMany({
      where: {
        option: {
          actionCode: option.actionCode,
          parcelId: option.parcelId,
        }
      }
    });

    for (let evidence of evidences) {
      if (evidence.fileUrl.endsWith(".pdf")) {
        // got(evidence.fileUrl, {isStream: true}).pipe(createWriteStream(path.join(process.cwd(), `${evidence.id}.pdf`)));
        // pdfEvidence.push(path.join(process.cwd(), `${evidence.id}.pdf`));
        pdfEvidence.push(evidence.fileUrl);
      }
    }

    reportOptions.push({
      actionCode: option.actionCode,
      parcelId: option.parcelId,
      evidences: evidences.map(evidence => ({
        id: evidence.id,
        title: evidence.title,
        notes: evidence.notes,
        fileUrl: evidence.fileUrl,
      }))
    });
  }

  const html = await compile(<MyDocument options={reportOptions} />);

  const pdf = await ff.pdf.generate(html, {});

  const blob = await put("report.pdf", pdf, {
    access: "public"
  });

  // pdf.pipe(createWriteStream(path.join(process.cwd(), "report.pdf")));

  // // wait for the pdf to be written to disk
  // await new Promise((resolve) => {
  //   pdf.on("finish", resolve);
  // });

  var merger = new PDFMerger();

  await merger.add(blob.url);
  // await merger.add(path.join(process.cwd(), "report.pdf"));

  for (let pdf of pdfEvidence) {
    await merger.add(pdf);
  }

  const mergedPdfBuffer = await merger.saveAsBuffer();

  await del(blob.url);
  // unlinkSync(path.join(process.cwd(), "report.pdf"));

  return new NextResponse(mergedPdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0, no-cache, must-revalidate",
    },
  });
}