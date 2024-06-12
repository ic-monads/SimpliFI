import { TaskWithAction } from "@/app/lib/types";
import { TaskCard } from "@/app/components/tasks/TaskCard";

function UpcomingTasks({ sbi, tasks }: { sbi: string, tasks: TaskWithAction[] }) {
    const fourWeeks = 28 * 24 * 60 * 60 * 1000;
    return (
        <>
            <p className="pb-4">
                Due within the next 28 days
            </p>
            <div className="flex overflow-x-scroll gap-6">
                {tasks
                    .filter((task) => task.completed === false && task.deadline < new Date(Date.now() + fourWeeks))
                    .sort((a, b) => a.deadline.valueOf() - b.deadline.valueOf())
                    .map((task) => (
                        <TaskCard key={task.id} sbi={sbi} task={task} htmlClass="min-w-64" />
                    ))}
            </div>
        </>
    )
}

export default UpcomingTasks
