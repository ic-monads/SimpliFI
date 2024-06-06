import { Card } from '@/app/ui/actions/cards';
import { fetchAllActionsWithParcels } from '@/app/lib/data';
import Link from 'next/link';
import GenerateReport from '../ui/options/generate-report';

export default async function Page() {
  const actions = await fetchAllActionsWithParcels();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Actions</h1>
        <div className='flex space-x-3'>
          <GenerateReport />
        </div>
      </div>
      <div className="pt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => <Card key={action.code} action={action} />)}
      </div>
    </div>
  );
}