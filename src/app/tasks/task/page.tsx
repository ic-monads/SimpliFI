import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTask, fetchParcelName, fetchActionName } from '@/app/lib/data';
import Evidences from '@/app/ui/evidences';
import { CompleteButton } from '@/app/ui/tasks/task/complete-button';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const { id } = searchParams;
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
          <h1 className="font-bold text-3xl mr-3">{task.title}</h1>
          <h2 className="">{actName} · {parcelName}</h2>
        </div>
        <CompleteButton task={task} />
      </div>
      <h2 className="text-xl font-semibold">Description</h2>
      <p>
        {task.description}
      </p>
      
      <div className="my-5">
        <h2 className="text-xl font-semibold">Task Evidence</h2>
        <Evidences evidences={task.evidences} />
      </div>
      <Link href={{
        pathname: "/options/option/add-evidence", 
        query: { actCode: task.actCode, parcelId: task.parcelId, taskId: id }
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}

