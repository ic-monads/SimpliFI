import { fetchTasksForActionOnFarm, fetchActionParcelsOnFarm, fetchAction } from '@/app/server-actions/action';
import Link from 'next/link';
import AllTasks from '@/app/components/tasks/AllTasks';
import Evidences from '@/app/components/Evidences';
import GenerateReport from '@/app/components/GenerateReport';
import { ParcelBadges } from '@/app/components/ParcelBadges';
import useSWR from 'swr';

export default async function Page({ params }: { params: { sbi: string, actionCode: string } }) {
  const { sbi, actionCode } = params;

  const [tasks, parcels, action] = await Promise.all([
    await fetchTasksForActionOnFarm(sbi, actionCode),
    await fetchActionParcelsOnFarm(sbi, actionCode),
    await fetchAction(actionCode),
  ]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between mb-3">
        <div>
          <h2>{actionCode}</h2>
          <h1 className={`font-semibold text-2xl`}>{action.name}</h1>
        </div>

        <div className='flex space-x-3'>
          <Link href={{ pathname: `/${sbi}/actions/${actionCode}/options/add` }}>
            <button className="btn btn-primary">Add Options</button>
          </Link>
          <GenerateReport sbi={sbi} />
        </div>
      </div>

      <ParcelBadges sbi={sbi} parcels={parcels} link={true} />
      
      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences 
            evidenceApiPath={`/api/${sbi}/actions/${actionCode}/evidence`}
            showTasks={true}
            addEvidence={
              <Link href={{ pathname: `/${sbi}/evidence/add`, query: { actCode: actionCode, fromTask: 'false' } }}>
                <button className="btn btn-primary">Add Evidence</button>
              </Link>
            }
            sbi={sbi}
          />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <AllTasks
            sbi={sbi}
            tasks={tasks}
            addTask={
              <Link href={{ pathname: `/${sbi}/tasks/add`, query: { actCode: actionCode } }}>
                <button className="mt-3 btn btn-primary">Add Task</button>
              </Link>
            } />
        </div>
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Information" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <p>Information regarding the {action.code} action can be found <a href={action.govUrl} target="_blank" className="text-green-600 hover:text-green-800">here</a>.</p>
        </div>
      </div>
    </div>
  );
}
