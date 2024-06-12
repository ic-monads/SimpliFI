import type { Task } from "@prisma/client"
import { TaskCard } from "./TaskCard"
import { TaskWithAction } from "@/app/lib/types"

function AllTasks({ sbi, tasks }: { sbi: string, tasks: TaskWithAction[] }) {
  return (
    <div className="pt-2 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {tasks.map((task) => (
            <TaskCard key={task.id} sbi={sbi} task={task} />
        ))}
    </div>
  )
}

export default AllTasks
