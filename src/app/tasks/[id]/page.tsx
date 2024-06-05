import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTask, fetchParcelName, fetchActionName } from '@/app/lib/data';
import Evidences from '@/app/ui/evidence/evidences';
import RequiredEvidences from '@/app/ui/evidence/required-evidences';
import { CompleteButton } from '@/app/ui/tasks/task/complete-button';
import { StatusBadge } from '@/app/ui/tasks/task/status-badge';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const task = await fetchTask(id);
  const [parcelName, actName] = await Promise.all([
    fetchParcelName(task.parcelId),
    fetchActionName(task.actCode)
  ])

  return (
    <div className="w-full">
      <div className="flex justify-between mb-3">
        {/* <Link href="/tasks">
          <ArrowLeftIcon className="size-6 ml-auto"/>
        </Link> */}
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-3xl mr-3">{task.title}</h1>
            <StatusBadge task={task} />
          </div>
          <h2 className="">{actName} · {parcelName}</h2>
        </div>
        <CompleteButton task={task} />
      </div>
      <h2 className="text-xl font-semibold">Description</h2>
      <p>
        {task.description}
      </p>
      
      <div className="my-5">
        <h2 className="text-xl font-semibold">Required Evidence</h2>
        <RequiredEvidences task={task} required={task.requiredEvidences} />
      </div>
      <Link href={{
        pathname: "/evidence/add-required", 
        query: { taskId: id, taskName: task.title }
      }}>
          <button className="btn btn-primary">Add Required Evidence</button>
      </Link>
      <div className="my-5">
        <h2 className="text-xl font-semibold">Evidence</h2>
        <Evidences evidences={task.evidences} />
      </div>
      <Link href={{
        pathname: "/evidence/add", 
        query: { actCode: task.actCode, parcelId: task.parcelId, taskId: id }
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}

