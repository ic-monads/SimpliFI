import { fetchParcelEvidences } from "@/app/server-actions/land-parcel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { sbi: string, parcelId: string }}) {
  const { parcelId } = params;
  const evidence = await fetchParcelEvidences(parcelId);
  return NextResponse.json({ evidence });
}