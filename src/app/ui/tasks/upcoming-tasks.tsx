import { Card } from "./cards";
import type { Task } from "@prisma/client";

function UpcomingTasks({ tasks }: { tasks: Task[] }) {
    return (
        <>
            <p className="pb-4">
                Due within the next 28 days
            </p>
            <div className="pt-2 pb-4 mb-4 flex overflow-x-scroll whitespace-nowrap gap-6">
                {tasks
                    .filter((task) => task.completed === false && task.deadline < new Date(Date.now() + 28 * 24 * 60 * 60 * 1000))
                    .sort((a, b) => a.deadline.valueOf() - b.deadline.valueOf())
                    .map((task) => (
                        <Card key={task.id} task={task} />
                    ))}
            </div>
        </>
    )
}

export default UpcomingTasks