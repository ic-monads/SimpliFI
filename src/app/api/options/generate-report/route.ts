import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import prisma from "@/app/lib/prisma";
import { Option } from "@prisma/client";
import Chromium from "@sparticuz/chromium";

async function htmlForContents(options: Option[]) {
  return (`
    <h1>Report</h1>
    <h2>Options</h2>
    <ul>
      ${options.map(option => `
        <li><a href="#${option.actionCode}${option.parcelId}">${option.actionCode} - ${option.parcelId}</a></li>
      `)}
    </ul>
  `);
}

async function htmlForOption(option: Option) {
  const evidences = await prisma.evidence.findMany({
    where: {
      actCode: option.actionCode,
      parcelId: option.parcelId
    }
  });

  if (evidences.length == 0) {
    return ("");
  }
  return (`
    <h1 id="${option.actionCode}${option.parcelId}">
      ${option.actionCode} - ${option.parcelId}
    </h1>
    <h2>Evidence</h2>
    ${evidences.map(evidence => `
      <h3>${evidence.title} - ${new Date(evidence.date).toLocaleDateString()}</h3>
      <p>${evidence.notes}</p>
      ${evidence.fileUrl.endsWith(".pdf") ? `<iframe src="https://docs.google.com/viewer?url=http://${evidence.fileUrl}&embedded=true" frameborder="0" height="500px" width="100%"></iframe>
      ` : `<img style="max-height: 500px; max-width: 700px;" src="${evidence.fileUrl}" />` }
    `)}
  `);
}

export async function GET() {
  const options = await prisma.option.findMany();

  Chromium.setGraphicsMode = false;
  const browser = await puppeteer.launch({
    args: Chromium.args,
    defaultViewport: Chromium.defaultViewport,
    executablePath: await Chromium.executablePath(),
    headless: Chromium.headless
  });
  const page = await browser.newPage();
  const optionTexts = await Promise.all(options.map(option => htmlForOption(option)));

  await page.setContent(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
        </style>
        </head>
      <body>
        ${await htmlForContents(options)}
        ${optionTexts.join("")}
      </body>
    </html>
  `, { waitUntil: "networkidle0" });

  const buffer = await page.pdf({ format: "a4" });

  // for (var option of options) {
  //   let optionPdf = await pdfForOption(option);
  //   const copiedPages = await pdfDoc.copyPages(optionPdf, optionPdf.getPageIndices());
  //   copiedPages.forEach((page) => pdfDoc.addPage(page));
  // }

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}