import { fetchEvidencesForActionWithTaskAndParcels, fetchTasksForAction, fetchParcelsForAction, fetchActionName } from '@/app/lib/data';
import Link from 'next/link';
import AllTasks from '@/app/ui/tasks/all-tasks';
import Evidences from '@/app/ui/evidence/evidences';
import GenerateReport from '@/app/ui/options/generate-report';
import { ParcelBadges } from '@/app/ui/parcel-badges';

export default async function Page({
  params
}: {
  params: {
    actionCode: string
  }
}) {
  const { actionCode } = params;

  const [evidence, tasks, parcels, actionName] = await Promise.all([
    await fetchEvidencesForActionWithTaskAndParcels(actionCode),
    await fetchTasksForAction(actionCode),
    await fetchParcelsForAction(actionCode),
    await fetchActionName(actionCode)
  ]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div>
          <h2>{actionCode}</h2>
          <h1 className={`font-semibold text-2xl`}>{actionName}</h1>
        </div>

        <div className='flex space-x-3'>
          <Link href={{ pathname: `/actions/add`, query: { actCode: actionCode }}}>
            <button className="btn btn-primary">Add Parcel</button>
          </Link>
          <GenerateReport />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-5">
        <ParcelBadges parcels={parcels} />
      </div>

      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences evidences={evidence} showTasks={true} />

          <Link href={{ pathname: "/evidence/add", query: { actCode: actionCode, fromTask: 'false' } }}>
            <button className="btn btn-primary">Add Evidence</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <AllTasks tasks={tasks} />

          <Link href={{ pathname: "/tasks/add", query: { actCode: actionCode, parcelId: parcels[0].id } }}>
              <button className="mt-3 btn btn-primary">Add Task</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Information" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          {/* Government link */}
        </div>
      </div>
    </div>
  );
}