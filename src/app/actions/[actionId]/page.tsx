import { Card } from '@/app/ui/options/cards';
import { fetchEvidenceForAction, fetchTasksForAction, fetchParcelsForAction } from '@/app/lib/data';
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
  const evidence = await fetchEvidenceForAction(params.actionId);
  const tasks = await fetchTasksForAction(params.actionId);
  const parcels = await fetchParcelsForAction(params.actionId);
  const actionName = 'TODO: Action Name';
  const { actionId } = params;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">{actionId} - {actionName}</h1>
        <div className='flex space-x-3'>
          {/* <Link href="/options/add">
            <button className="btn btn-primary">Add Option</button>
          </Link> */}
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
          <Evidences evidences={evidence} />
        
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

          {/* <Link href={{
            pathname: "/tasks/add", 
            query: searchParams
          }}>
              <button className="mt-3 btn btn-primary">Add Task</button>
          </Link> */}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Information" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6"></div>
      </div>
    </div>
  );
}