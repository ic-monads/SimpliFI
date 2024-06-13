import "dotenv/config";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { compile } from "@fileforge/react-print";
import { FileforgeClient } from "@fileforge/client"
import { SFIReport } from "./document";
import type { ReportOption } from "./document";
import { put, del } from "@vercel/blob";
import { PDFDocument, StandardFonts }  from "pdf-lib";
import { fetchFarmOptions } from "@/app/server-actions/option";

const ff = new FileforgeClient({
  apiKey: process.env.FILEFORGE_API_KEY,
})

export const maxDuration = 60;
export const dynamic = "force-dynamic";

async function copyPagesAtUrl(from: string, to: PDFDocument) {
  const reportPdfBytes = await fetch(from).then((res) => res.arrayBuffer());
  const reportPdf = await PDFDocument.load(reportPdfBytes);
  const copied = await to.copyPages(reportPdf, reportPdf.getPageIndices());
  for (let page of copied) {
    to.addPage(page);
  }
}

export async function GET(request: NextRequest, { params }: { params: { sbi: string }}) {
  const { sbi } = params;
  const options = await fetchFarmOptions(sbi);
  let reportOptions: ReportOption[] = [];
  let pdfEvidence: string[] = [];

  for (let option of options) {
    const evidences = await prisma.evidence.findMany({
      where: {
        optionEvidences: {
          some: {
            actCode: option.actionCode,
            parcelId: option.parcelId
          }
        }
      }
    });

    for (let evidence of evidences) {
      if (evidence.fileUrl.endsWith(".pdf")) {
        if (!pdfEvidence.includes(evidence.fileUrl)) {
          pdfEvidence.push(evidence.fileUrl);
        }
      }
    }

    reportOptions.push({
      actionCode: option.actionCode,
      parcelId: option.parcelId,
      action: {
        name: option.action.name
      },
      parcel: {
        name: option.parcel.name
      },
      evidences: evidences.map((evidence) => {
        return {
          id: evidence.id,
          title: evidence.title,
          date: evidence.date,
          notes: evidence.notes,
          fileUrl: evidence.fileUrl,
          appendixPos: evidence.fileUrl.endsWith(".pdf") ? pdfEvidence.indexOf(evidence.fileUrl) + 1 : undefined,
        }
      })
    });
  }

  const html = await compile(<SFIReport sbi={sbi} options={reportOptions} />);
  const pdf = await ff.pdf.generate(html, { options: { test: false } });
  
  const blob = await put("report.pdf", pdf, {
    access: "public"
  });

  const pdfDoc = await PDFDocument.create();
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  await copyPagesAtUrl(blob.url, pdfDoc);

  for (let i = 0; i < pdfEvidence.length; i++) {
    const appendixPage = pdfDoc.addPage();
    const { width, height } = appendixPage.getSize();
    const text = `Appendix ${i + 1}`;
    const size = 24;
    appendixPage.drawText(text, {
      x: (width - helveticaBoldFont.widthOfTextAtSize(text, size)) / 2,
      y: height / 2,
      size,
      font: helveticaBoldFont
    });
    await copyPagesAtUrl(pdfEvidence[i], pdfDoc);
  }

  del(blob.url);

  return new NextResponse(Buffer.from(await pdfDoc.save()), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0, no-cache, must-revalidate",
    },
  });
}
