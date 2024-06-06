import "dotenv/config";

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { compile } from "@fileforge/react-print";
import { FileforgeClient } from "@fileforge/client"
import { MyDocument } from "./document";
import type { ReportOption } from "./document";
import { put, del } from "@vercel/blob";
import { PDFDocument, StandardFonts }  from "pdf-lib";

const ff = new FileforgeClient({
  apiKey: process.env.FILEFORGE_API_KEY,
})

export const maxDuration = 60;

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
        pdfEvidence.push(evidence.fileUrl);
      }
    }

    reportOptions.push({
      actionCode: option.actionCode,
      parcelId: option.parcelId,
      evidences: evidences.map((evidence) => {
        if (evidence.fileUrl.endsWith(".pdf")) {
          return {
            id: evidence.id,
            title: evidence.title,
            date: evidence.date,
            notes: evidence.notes,
            fileUrl: evidence.fileUrl,
            appendixPos: pdfEvidence.indexOf(evidence.fileUrl) + 1,
          }
        } else {
          return {
            id: evidence.id,
            title: evidence.title,
            date: evidence.date,
            notes: evidence.notes,
            fileUrl: evidence.fileUrl,
            appendixPos: undefined,
          }
        }
      })
    });
  }

  const html = await compile(<MyDocument options={reportOptions} />);
  const pdf = await ff.pdf.generate(html, {});
  const blob = await put("report.pdf", pdf, {
    access: "public"
  });

  const pdfDoc = await PDFDocument.create();
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const reportPdfBytes = await fetch(blob.url).then((res) => res.arrayBuffer());
  const reportPdf = await PDFDocument.load(reportPdfBytes);
  const copied = await pdfDoc.copyPages(reportPdf, reportPdf.getPageIndices());
  for (let page of copied) {
    pdfDoc.addPage(page);
  }

  for (let pdf of pdfEvidence) {
    const appendixPage = pdfDoc.addPage();
    const { width, height } = appendixPage.getSize();
    appendixPage.drawText(`Appendix ${pdfEvidence.indexOf(pdf) + 1}`, {
      x: 50,
      y: height - (50 + 24),
      size: 24,
      font: helveticaBoldFont
    });
    const evidencePdfBytes = await fetch(pdf).then((res) => res.arrayBuffer());
    const evidencePdf = await PDFDocument.load(evidencePdfBytes);
    const copied = await pdfDoc.copyPages(evidencePdf, evidencePdf.getPageIndices());
    for (let page of copied) {
      pdfDoc.addPage(page);
    }
  }

  del(blob.url);

  return new NextResponse(Buffer.from(await pdfDoc.save()), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0, no-cache, must-revalidate",
    },
  });
}