import { Card } from '@/app/ui/options/cards';
import { fetchAllOptions } from '../lib/data';
import Link from 'next/link';

export default async function Page() {
  const options = await fetchAllOptions();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Options</h1>
        <Link href="/options/add">
          <button className="btn btn-primary">Add Option</button>
        </Link>
      </div>
      <div className="pt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => <Card key={`${o.actionCode}${o.parcelId}`} action={o.action} parcel={o.parcel} />)}
      </div>
    </div>
  );
}