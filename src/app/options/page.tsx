import GenericButton from '@/app/ui/generic-button';
import { Card } from '@/app/ui/options/cards';

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>My Options</h1>
        <div className='flex gap-4'>
          <GenericButton text='Add Option'></GenericButton>
          <GenericButton text='Generate Report'></GenericButton>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card id='1'/>
        <Card id='2'/>
        <Card id='3'/>
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