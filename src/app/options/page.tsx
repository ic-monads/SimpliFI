import { Card } from '@/app/ui/options/cards';
import { AddOption } from '../ui/options/buttons';
import { fetchAllOptions } from '../lib/data';
import { Button } from 'flowbite-react';
import Link from 'next/link';

export default async function Page() {
  const options = await fetchAllOptions();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between border-red-500">
        <h1 className="text-2xl font-semibold">My Options</h1>
        <Link href="/options/add">
          <Button color={"success"}>Add Option</Button>
        </Link>
      </div>
      <div className="pt-2 grid gap-4 grid-cols-4 sm:grid-cols-2">
        {options.map((o) => <Card key={`${o.actionCode}${o.parcelId}`} action={o.action} parcel={o.parcel} />)}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}