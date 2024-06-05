"use server";

import type { Task } from "@prisma/client";

export async function StatusBadge({ task, empty }: { task: Task, empty?: boolean }) {
  var status, badgeClass;
  if (task.completed) {
    status = "Completed";
    badgeClass = "badge-success text-white";
  } else {
    status = "Pending";
    badgeClass = "badge-warning";
  }

  if (empty) badgeClass += " badge-xs";

  return(<div className={`text-xs badge ${badgeClass}`}>{empty ? "" : status}</div>);
}