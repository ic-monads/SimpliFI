import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchActionName, fetchOptionEvidence, fetchParcelName } from '@/app/lib/data';
import Evidences from '@/app/ui/evidence/evidences';

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
      <div className="flex">
        <Link href="/options">
          <ArrowLeftIcon className="size-6 ml-auto"/>
        </Link>
        <div className="ml-5 flex-row w-1/2 items-center justify-between">
          <h1 className={`font-semibold text-2xl`}>{actCode} - {actName}</h1>
          <h2 className={`text-xl`}>Showing evidencing for {parcelName}</h2>
          
        </div>
      </div>
      
      <div className="my-5 max-w-4xl relative overflow-x-auto">
        <h2 className="text-xl font-semibold">Evidence</h2>
        <Evidences evidences={data} />
      </div>
      <Link href={{
        pathname: "/evidence/add", 
        query: { actCode: searchParams.actCode, parcelId: searchParams.parcelId, fromTask: 'false' }
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>

      <Link href={{
        pathname: "/tasks/new", 
        query: searchParams
      }}>
          <button className="ml-3 btn btn-primary">Add Task</button>
      </Link>
    </div>
  );
}

