import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchActionName, fetchOptionEvidence, fetchParcelName } from '@/app/lib/data';
import Evidences from '@/app/ui/evidences';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    actCode: string;
    parcelId: string;
  };
}) {
  const { actCode, parcelId } = searchParams;
  const data = await fetchOptionEvidence(actCode, parcelId);
  const [parcelName, actName] = await Promise.all([
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
          <h1 className={`font-semibold text-2xl`}>{actCode} - {actName}</h1>
          <h2 className={`text-xl`}>Showing evidencing for {parcelName}</h2>
          
        </div>
      </div>

      <div role="tablist" className="tabs tabs-lifted">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences evidences={data} />
        
          <Link href={{
            pathname: "/evidence/add", 
            query: searchParams
          }}>
              <button className="btn btn-primary">Add Evidence</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Link href={{
            pathname: "/tasks/add", 
            query: searchParams
          }}>
              <button className="ml-3 btn btn-primary">Add Task</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Information" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6"></div>
      </div>
    </div>
  );
}

