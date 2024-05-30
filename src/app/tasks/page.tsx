import GenericButton from '@/app/ui/generic-button';
import ButtonGroup from '../ui/button-group';


export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Upcoming Tasks</h1>
        <div className='flex gap-4'>
          <GenericButton text='Add Task'></GenericButton>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      {/*  <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
      <hr className='m-4' />
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Future Tasks</h1>
      </div>
      <ButtonGroup texts={["weekly", "monthly"]}></ButtonGroup>
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