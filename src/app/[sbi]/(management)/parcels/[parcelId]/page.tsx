import { fetchParcelName, fetchActionsForParcel, fetchParcelFeature } from '@/app/server-actions/land-parcel';
import React from 'react';
import GenerateReport from '@/app/components/GenerateReport';
import Link from 'next/link';
import ActionBadges from '@/app/components/ActionBadges';
import Evidences from '@/app/components/Evidences';
import { fetchTasksForParcel } from '@/app/server-actions/action';
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
  
  const [parcelName, feature, actions, tasks] = await Promise.all([
    await fetchParcelName(parcelId),
    await fetchParcelFeature(parcelId),
    await fetchActionsForParcel(parcelId),
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
        <ActionBadges sbi={sbi} actions={actions} link={true} />
      </div>

      <ParcelMap feature={feature} height={400} />

      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Evidence" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Evidences sbi={sbi} evidenceApiPath={`/api/${sbi}/parcels/${parcelId}/evidence`} showTasks={true} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tasks" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <AllTasks sbi={sbi} tasks={tasks} />
        </div>
      </div>
    </div>
  );
}
