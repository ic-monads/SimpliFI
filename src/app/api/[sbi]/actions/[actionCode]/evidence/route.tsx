import { fetchFarmActionEvidence } from "@/app/server-actions/action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { sbi: string, actionCode: string }}) {
  const { sbi, actionCode } = params;
  const evidence = await fetchFarmActionEvidence(sbi, actionCode);
  return NextResponse.json({ evidence });
}