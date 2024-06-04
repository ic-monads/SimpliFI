import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTask, fetchParcelName, fetchActionName } from '@/app/lib/data';
import Evidences from '@/app/ui/evidences';

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
      <div className="flex">
        <Link href="/tasks">
          <ArrowLeftIcon className="size-6 ml-auto"/>
        </Link>
        <div className="ml-5 flex-row w-1/2 items-center justify-between">
          <h1 className={`font-semibold text-2xl`}>{task.title}</h1>
          <h2 className={`text-xl`}>{actName} - {parcelName}</h2>
        </div>
      </div>
      <p>
        {task.description}
      </p>
      
      <div className="my-5 max-w-4xl relative overflow-x-auto">
        <h2 className="text-xl font-semibold">Task Evidence</h2>
        <Evidences evidences={task.evidences} />
      </div>
      <Link href={{
        pathname: "/options/option/add-evidence", 
        query: searchParams
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}

