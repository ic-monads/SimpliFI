import type { Task } from "@prisma/client"
import { TaskCard } from "./TaskCard"
import { TaskWithAction } from "@/app/lib/types"
import EmptyCollection from "../EmptyCollection"
import { ReactElement } from "react"

function AllTasks({ sbi, tasks, addTask }: { sbi: string, tasks: TaskWithAction[], addTask?: ReactElement}) {
  if (tasks.length === 0) return <EmptyCollection message="No tasks found." action={addTask} />

  return (
    <>
      <div className="pt-2 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {tasks.map((task) => (
              <TaskCard key={task.id} sbi={sbi} task={task} />
          ))}
      </div>
      {addTask}
    </>
  )
}

export default AllTasks
