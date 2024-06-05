import Link from 'next/link';
import { StatusBadge } from '@/app/ui/tasks/task/status-badge';
import type { Task } from "@prisma/client";
import { fetchActionName } from '@/app/lib/data';

export async function Card({ task }: { task: Task }) {
  const actionName = await fetchActionName(task.actCode);

  return (
    <Link href={`/tasks/${task.id}`} >
      <div className="card min-w-64 border shadow-sm p-3 shadow-sm hover:bg-gray-100 transition-all">
        <div className="flex justify-between mb-2 gap-4">
          <h3 className="text-md font-bold text-nowrap truncate">{task.title}</h3>
          <StatusBadge task={task} empty={true} />
        </div>
        <p className="text-xs mb-3">
          {task.actCode}: {actionName}
        </p>
        <div className="badge badge-outline text-xs">{task.parcelId}</div>
      </div>
    </Link>
  )
}