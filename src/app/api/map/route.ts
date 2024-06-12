import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const sbi = req.nextUrl.searchParams.get("sbi");
  
  const response = await fetch(
    `https://environment.data.gov.uk/data-services/RPA/LandParcels/wfs?version=2.0.0&request=GetFeature&typeNames=RPA:LandParcels&cql_filter=SBI=${sbi}&srsname=CRS:84&outputFormat=application/json`
  );

  const data = await response.json();
  // console.log(data);
  return NextResponse.json({ data });
}
