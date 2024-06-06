import { Card } from '@/app/ui/actions/cards';
import { fetchAllActions } from '@/app/lib/data';
import Link from 'next/link';
import GenerateReport from '../ui/options/generate-report';

export default async function Page() {
  const actions = await fetchAllActions();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Actions</h1>
        <div className='flex space-x-3'>
          {/* <Link href="/options/add">
            <button className="btn btn-primary">Add Option</button>
          </Link> */}
          <GenerateReport />
        </div>
      </div>
      <div className="pt-2 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => <Card key={a.code} action={a} />)}
      </div>
    </div>
  );
}