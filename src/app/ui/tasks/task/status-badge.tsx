"use server";

import type { Task } from "@prisma/client";

export async function StatusBadge({ task }: { task: Task }) {
  var status, badgeClass;
  if (task.completed) {
    status = "Completed";
    badgeClass = "badge-success";
  } else {
    status = "Pending";
    badgeClass = "badge-warning";
  }

  return(<div className={`badge ${badgeClass}`}>{status}</div>);
}