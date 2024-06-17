import { fetchTaskEvidences } from "@/app/server-actions/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { sbi: string, taskId: string }}) {
  const { taskId } = params;
  const evidence = await fetchTaskEvidences(taskId);
  return NextResponse.json({ evidence });
}