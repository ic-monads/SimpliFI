import { TaskWithActionAndParcels } from "@/app/lib/types";
import { TaskCard } from "@/app/components/tasks/TaskCard";
import EmptyCollection from "@/app/components/EmptyCollection";
import Moment from "moment";

function UpcomingTasks({ sbi, tasks }: { sbi: string, tasks: TaskWithActionAndParcels[] }) {
  const upcomingTasks = tasks.filter((task) => !task.completed && Moment(task.deadline).isBefore(Moment().add(4, 'weeks')))

  return (
    <>
      <p className="pb-4">
        Due within the next 28 days
      </p>
      {tasks.length === 0 ?
        <EmptyCollection message="No upcoming tasks found." /> :
        <div className="flex overflow-x-scroll gap-6">
          {upcomingTasks.map((task) => <TaskCard key={task.id} sbi={sbi} task={task} htmlClass="min-w-64" />)}
        </div>
      }
    </>
  )
}

export default UpcomingTasks
