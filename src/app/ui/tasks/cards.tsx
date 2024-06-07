import Link from 'next/link';
import { StatusBadge } from '@/app/ui/tasks/task/status-badge';
import Moment from "moment";
import TaskParcels from './task-parcels';
import { TaskWithAction } from '@/app/lib/data';

export async function Card({ task }: { task: TaskWithAction }) {
  return (
    <Link href={`/tasks/${task.id}`} >
      <div className="card min-w-64 border p-3 shadow-sm hover:bg-gray-100 transition-all">
        <div className="flex justify-between mb-2 gap-4">
          <h3 className="text-md font-bold text-nowrap truncate">{task.title}</h3>
          <StatusBadge task={task} empty={true} />
        </div>
        <p className="text-xs mb-2">
          {task.actionCode}: {task.action.name}
        </p>
        <p className="text-xs">Due on {Moment(task.deadline).format("DD/MM/YYYY")}</p>
        <TaskParcels taskId={task.id} />
      </div>
    </Link>
  )
}