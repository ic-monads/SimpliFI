"use client";

import { updateTaskCompleted } from '@/app/lib/actions';
import { useState } from "react";
import type { Task } from "@prisma/client";

export function CompleteButton({ task }: { task: Task }) {
  const [completed, setCompleted] = useState(task.completed);

  async function handleClick() {
    const updatedTask = await updateTaskCompleted(task.id, !completed);
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