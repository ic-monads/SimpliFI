import { fetchParcelName, fetchActionsForParcel } from '@/app/server-actions/land-parcel';
import React from 'react';
import GenerateReport from '@/app/actions/GenerateReport';
import Link from 'next/link';
import ActionBadges from '@/app/components/ActionBadges';

export default async function Page({
  params
}: {
  params: {
    parcelId: string
  }
}) {
  
  const { parcelId } = params;
  
  const [parcelName, actions] = await Promise.all([
    await fetchParcelName(parcelId),
    await fetchActionsForParcel(parcelId)
  ]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div>
          <h2>{parcelId}</h2>
          <h1 className={`font-semibold text-2xl`}>{parcelName}</h1>
        </div>
        <div className='flex space-x-3'>
          <Link href={{ pathname: `/parcels/${parcelId}/options/add` }}>
            <button className="btn btn-primary">Add Option</button>
          </Link>
          <GenerateReport />
        </div>
      </div>

      <div className="flex w-full items-center justify-start gap-x-5"> 
        <ActionBadges actions={actions} />
      </div>
    </div>
  );
}
