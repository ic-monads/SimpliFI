import "dotenv/config";

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { compile } from "@fileforge/react-print";
import { FileforgeClient } from "@fileforge/client"
import { MyDocument } from "./document";
import type { ReportOption } from "./document";
import { createWriteStream, unlinkSync } from "fs";
import path from "path";
import got from "got";
import PDFMerger from "pdf-merger-js";

const ff = new FileforgeClient({
  apiKey: process.env.FILEFORGE_API_KEY,
})

export async function GET() {
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
        got(evidence.fileUrl, {isStream: true}).pipe(createWriteStream(path.join(process.cwd(), `${evidence.id}.pdf`)));
        pdfEvidence.push(path.join(process.cwd(), `${evidence.id}.pdf`));
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

  pdf.pipe(createWriteStream(path.join(process.cwd(), "report.pdf")));

  // wait for the pdf to be written to disk
  await new Promise((resolve) => {
    pdf.on("finish", resolve);
  });

  // const pdfStream = createReadStream(path.join(process.cwd(), "report.pdf"));

  var merger = new PDFMerger();

  await merger.add(path.join(process.cwd(), "report.pdf"));

  for (let pdf of pdfEvidence) {
    await merger.add(pdf);
  }

  const mergedPdfBuffer = await merger.saveAsBuffer();

  for (let pdf of pdfEvidence) {
    unlinkSync(pdf);
  }
  unlinkSync(path.join(process.cwd(), "report.pdf"));

  // const pdfs = await ff.pdf.merge([pdfStream], {}, {});

  // const pdfsStream = new ReadableStream({
  //   start(controller) {
  //     pdfs.on("data", chunk => controller.enqueue(chunk));
  //     pdfs.on("end", () => controller.close());
  //     pdfs.on("error", err => controller.error(err));
  //   },
  //   cancel() {
  //     pdfs.destroy();
  //   }
  // });

  return new NextResponse(mergedPdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0, no-cache, must-revalidate",
    },
  });
}