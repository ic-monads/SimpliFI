import { fetchFarmTasks } from "@/app/server-actions/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { sbi: string } }): Promise<NextResponse> {
  const { sbi } = params;
  const tasks = await fetchFarmTasks(sbi);
  return NextResponse.json({ tasks });
}
