import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchActionName, fetchOption, fetchParcelName } from '@/app/lib/data';
import Evidences from '@/app/ui/evidences';
import AllTasks from '@/app/ui/tasks/all-tasks';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    actCode: string;
    parcelId: string;
  };
}) {
  const { actCode, parcelId } = searchParams;
  
  const [option, parcelName, actName] = await Promise.all([
    fetchOption(actCode, parcelId),
    fetchParcelName(parcelId),
    fetchActionName(actCode)
  ])

  return (
    <div className="w-full">
      <div className="flex flex justify-between mb-3">
        {/* <Link href="/options">
          <ArrowLeftIcon className="size-6 ml-auto"/>
        </Link> */}
        <div className="flex-row items-center justify-between">
          <h2 className="">{actCode}</h2>
          <h1 className={`font-semibold text-2xl`}>{actName}</h1>
        </div>
      </div>
      <div className="badge badge-outline">{parcelId}: {parcelName}</div>

      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences evidences={option.evidences} />
        
          <Link href={{
            pathname: "/evidence/add", 
            query: searchParams
          }}>
              <button className="btn btn-primary">Add Evidence</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <AllTasks tasks={option.tasks} />

          <Link href={{
            pathname: "/tasks/add", 
            query: searchParams
          }}>
              <button className="mt-3 btn btn-primary">Add Task</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Information" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6"></div>
      </div>
    </div>
  );
}

