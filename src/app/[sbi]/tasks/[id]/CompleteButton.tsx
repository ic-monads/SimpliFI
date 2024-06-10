"use client";

import { updateTaskCompleted } from '@/app/server-actions/task';
import { useState } from "react";
import type { Task } from "@prisma/client";

export function CompleteButton({ sbi, task }: { sbi: string, task: Task }) {
  const [completed, setCompleted] = useState(task.completed);

  async function handleClick() {
    const updatedTask = await updateTaskCompleted(sbi, task.id, !completed);
    setCompleted(updatedTask.completed);
  }

  return(
    <form action={handleClick}>
      <button className={`btn ${completed ? "" : "btn-primary"}`} type="submit">
        Mark as {completed ? "incomplete" : "complete"}
      </button>
    </form>
  );
}