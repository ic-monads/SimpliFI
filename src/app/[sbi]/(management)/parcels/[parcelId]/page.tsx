import { fetchParcelName, fetchActionsForParcel, fetchParcelFeature } from '@/app/server-actions/land-parcel';
import React from 'react';
import GenerateReport from '@/app/components/GenerateReport';
import Link from 'next/link';
import ActionBadges from '@/app/components/ActionBadges';
import Evidences from '@/app/components/Evidences';
import { fetchEvidencesForParcelWithTaskAndActionOnFarm, fetchTasksForParcel } from '@/app/server-actions/action';
import AllTasks from '@/app/components/tasks/AllTasks';
import ParcelMap from "@/app/components/ParcelMap";

export default async function Page({
  params
}: {
  params: {
    sbi: string,
    parcelId: string
  }
}) {
  
  const { sbi, parcelId } = params;
  
  const [parcelName, feature, actions, evidence, tasks] = await Promise.all([
    await fetchParcelName(parcelId),
    await fetchParcelFeature(parcelId),
    await fetchActionsForParcel(parcelId),
    await fetchEvidencesForParcelWithTaskAndActionOnFarm(sbi, parcelId),
    await fetchTasksForParcel(parcelId)
  ]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div>
          <h2>{parcelId}</h2>
          <h1 className={`font-semibold text-2xl`}>{parcelName}</h1>
        </div>
        <div className='flex space-x-3'>
          <Link href={`/${sbi}/parcels/${parcelId}/options/add`}>
            <button className="btn btn-primary">Add Options</button>
          </Link>
          <GenerateReport sbi={sbi} />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-5"> 
        <ActionBadges actions={actions} />
      </div>

      <ParcelMap feature={feature} />

      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences evidences={evidence} showTasks={true} />

          {/* <Link href={{ pathname: "/evidence/add", query: { actCode: actionCode, fromTask: 'false' } }}>
            <button className="btn btn-primary">Add Evidence</button>
          </Link> */}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <AllTasks sbi={sbi} tasks={tasks} />

          {/* <Link href={{ pathname: "/tasks/add", query: { actCode: actionCode, parcelId: parcels[0].id } }}>
              <button className="mt-3 btn btn-primary">Add Task</button>
          </Link> */}
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Information" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          {/* Government link */}
        </div>
      </div>
    </div>
  );
}
