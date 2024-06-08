import type { Task } from "@prisma/client"
import { TaskCard } from "./TaskCard"
import { TaskWithAction } from "@/app/lib/data"

function AllTasks({ tasks }: { tasks: TaskWithAction[] }) {
  return (
    <div className="pt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
        ))}
    </div>
  )
}

export default AllTasks
