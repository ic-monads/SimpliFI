import { fetchTaskRequiredrequiredEvidences } from "@/app/server-actions/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { sbi: string, taskId: string }}) {
  const { taskId } = params;
  const requiredEvidences = await fetchTaskRequiredrequiredEvidences(taskId);
  return NextResponse.json({ requiredEvidences });
}