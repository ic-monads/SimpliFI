import { ParcelCard } from './ParcelCard';
import { fetchFarmParcelsWithActions } from '@/app/server-actions/action'
import ParcelsMap from '@/app/components/ParcelsMap';
import Link from 'next/link';

export default async function Page({ params }: { params: { sbi: string } }) {
  const { sbi } = params;
  const parcels = await fetchFarmParcelsWithActions(sbi);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Land Parcels</h1>
      </div>

      <ParcelsMap parcels={parcels} />

      <div className="pt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {parcels.map((parcel) => <ParcelCard key={parcel.id} parcel={parcel}/>)}
      </div>
    </div>
  );
}
