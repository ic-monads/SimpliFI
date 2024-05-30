
import GenericButton from '@/app/ui/generic-button';
import prisma from '@/app/lib/prisma';

async function getEvidence() {
  const evs = await prisma.evidence.findMany();
  return evs;
}

export default async function Page() {
  let evs = getEvidence();
  console.log("Evidence", evs);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>My Options</h1>
        <div className='flex gap-4'>
          <GenericButton text='Generate Report'></GenericButton>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      {/* Pull evidence data from evidence table using Prisma*/}
    </div>
  );
}