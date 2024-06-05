import type { Task } from "@prisma/client"
import { Card } from "./cards"


function AllTasks({ tasks }: { tasks: Task[] }) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Tasks</h1>
            </div>
            <div className="pt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {tasks.map((task) => (
                    <Card key={task.id} task={task} />
                ))}
            </div>
        </>
    )
}

export default AllTasks