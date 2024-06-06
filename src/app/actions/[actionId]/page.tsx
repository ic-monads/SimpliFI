import { fetchEvidenceForActionWithParcelAndTaskName, fetchTasksForAction, fetchParcelsForAction, fetchActionName } from '@/app/lib/data';
import Link from 'next/link';
import AllTasks from '@/app/ui/tasks/all-tasks';
import Evidences from '@/app/ui/evidence/evidences';
import GenerateReport from '@/app/ui/options/generate-report';

export default async function Page({ 
  params 
}: { 
  params: { 
    actionId: string
  }
}) {
  const [evidence, tasks, parcels, actionName] = await Promise.all([
    await fetchEvidenceForActionWithParcelAndTaskName(params.actionId),
    await fetchTasksForAction(params.actionId),
    await fetchParcelsForAction(params.actionId),
    await fetchActionName(params.actionId)
  ])
  const { actionId } = params;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">{actionId} - {actionName}</h1>
        <div className='flex space-x-3'>
          <Link href={{
            pathname: `/actions/add`,
            query: { actCode: actionId }
          }}>
            <button className="btn btn-primary">Add Parcel</button>
          </Link>
          <GenerateReport />
        </div>
      </div>
      <div className="flex w-full items-center justify-start gap-x-5">
        <h2 className="text-2xl font-semibold">Parcels</h2>
        {parcels.map((p) => (
          <p key={p.id}>{p.name}</p>
        ))}
      </div>
      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences evidences={evidence} showTask={true}/>
        
          <Link href={{
            pathname: "/evidence/add", 
            query: { actCode: actionId, fromTask: 'false' }
          }}>
              <button className="btn btn-primary">Add Evidence</button>
          </Link>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <AllTasks tasks={tasks} />

          <Link href={{
            pathname: "/tasks/add", 
            query: { actCode: actionId, parcelId: parcels[0].id }
          }}>
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