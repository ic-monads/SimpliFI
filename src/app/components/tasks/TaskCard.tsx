import Link from 'next/link';
import { StatusBadge } from '@/app/components/tasks/StatusBadge';
import Moment from "moment";
import TaskParcels from './TaskParcels';
import { TaskWithAction } from '@/app/lib/types';

export async function TaskCard({ sbi, task, htmlClass }: { sbi: string, task: TaskWithAction, htmlClass?: string }) {
  return (
    <Link href={`/${sbi}/tasks/${task.id}`} >
      <div className={`card border p-3 shadow-sm hover:bg-gray-100 transition-all ${htmlClass}`}>
        <div className="flex justify-between mb-2 gap-4">
          <h3 className="text-md font-bold text-nowrap truncate">{task.title}</h3>
          <StatusBadge task={task} empty={true} />
        </div>
        <p className="text-xs mb-2">
          {task.actionCode}: {task.action.name}
        </p>
        <p className="text-xs mb-3">Due on {Moment(task.deadline).format("DD/MM/YYYY")}</p>
        <TaskParcels taskId={task.id} />
      </div>
    </Link>
  )
}
