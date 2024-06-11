import { ParcelCard } from './ParcelCard';
import { fetchFarmParcelsWithActions } from '@/app/server-actions/action'
import Link from 'next/link';

export default async function Page({ params }: { params: { sbi: string } }) {
  const { sbi } = params;
  const parcels = await fetchFarmParcelsWithActions(sbi);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Parcels</h1>
        <div className='flex space-x-3'>
          <Link href={`/${sbi}/parcels/add`}>
            <button className="btn btn-primary">Add Parcel</button>
          </Link>
        </div>
      </div>
      <div className="pt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {parcels.map((parcel) => <ParcelCard key={parcel.id} parcel={parcel}/>)}
      </div>
    </div>
  );
}
