import { fetchParcelName, fetchActionsForParcel } from '@/app/server-actions/land-parcel';
import React from 'react';

export default async function Page({
  params
}: {
  params: {
    parcelId: string
  }
}) {
  
  const { parcelId } = params;
  console.log(parcelId);
  
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
      </div>

      <div className="flex w-full items-center justify-start gap-x-5">
        {/* <ParcelBadges parcels={parcels} /> */}
        {actions.map((action) => <p key={action.code}>{action}</p>)}
      </div>
    </div>
  );
}
