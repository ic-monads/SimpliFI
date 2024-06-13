import { HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import resJson from "../../../../../response.json";

export async function POST(request: NextRequest) {
  // const body: any = (await request.json()) as HandleUploadBody;

  // const response = await fetch("https://api.pdf.co/v1/pdf/documentparser", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "x-api-key": process.env.PDF_CO_TOKEN!,
  //   },
  //   body: JSON.stringify({
  //     url: body.fileUrl,
  //     outputFormat: "JSON",
  //     templateId: "9504",
  //     async: false,
  //     inline: "true",
  //     password: "",
  //     profiles: "",
  //   }),
  // });
  // const resJson = await response.json();
  const data = JSON.stringify(resJson);

  return NextResponse.json(data, { status: 200 });
}
