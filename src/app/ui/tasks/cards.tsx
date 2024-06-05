import Link from 'next/link';
import { StatusBadge } from '@/app/ui/tasks/task/status-badge';
import type { Task } from "@prisma/client";
import Moment from "moment";

export function Card({ task }: { task: Task }) {
  return (
    <Link href={`/tasks/${task.id}`} >
      <div className="rounded-xl bg-gray-50 px-4 py-2 shadow-sm hover:bg-gray-100 transition-all">
        <div className="flex justify-between mb-2 gap-4">
          <h3 className="text-md font-bold">{task.title}</h3>
          <StatusBadge task={task} />
        </div>
        <p className="text-sm">
          {task.parcelId} · {task.actCode}
        </p>
        <hr />
        <p className='text-sm'>
          Due: {Moment(task.deadline).format("DD/MM/YYYY")}
        </p>
      </div>
    </Link>
  )
}