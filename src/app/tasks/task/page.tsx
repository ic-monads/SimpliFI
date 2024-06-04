import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTaskDetails, fetchParcelName, fetchActionName } from '@/app/lib/data';
import Submit from '@/app/ui/options/option/submit-error';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const { id } = searchParams;
  const taskDetails = await fetchTaskDetails(id);
  const [parcelName, actName] = await Promise.all([
    fetchParcelName(taskDetails.parcelId),
    fetchActionName(taskDetails.actCode)
  ])

  return (
    <div className="w-full">
      <div className="flex">
        <Link href="/options">
          <ArrowLeftIcon className="size-6 ml-auto"/>
        </Link>
        <div className="ml-5 flex-row w-1/2 items-center justify-between">
          <h1 className={`font-semibold text-2xl`}>{taskDetails.title}</h1>
          <h2 className={`text-xl`}>{actName} - {parcelName}</h2>
        </div>
      </div>
      <p>
        {taskDetails.description}
      </p>
      
      {/* <div className="my-5 max-w-4xl relative overflow-x-auto">
        <h2 className="text-xl font-semibold">Task Evidence</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Date
              </th>
              <th scope="col">
                File
              </th>
              <th scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((ev) => (
              <tr key={ev.id}>
                <th scope="row">
                  {ev.title}
                </th>
                <td>
                  {new Date(ev.date).toLocaleDateString()}
                </td>
                <td>
                  <a className="btn btn-sm btn-content-neutral" href={ev.fileUrl} target="_blank" rel="noreferrer">
                    View File
                  </a>
                </td>
                <td>
                  <form action={deleteEvidence.bind(null, ev.id)}>
                    <Submit />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <Link href={{
        pathname: "/options/option/add-evidence", 
        query: searchParams
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}

