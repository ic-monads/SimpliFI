import GenericButton from '@/app/ui/generic-button';
import prisma from '@/app/lib/prisma';
import { Evidence } from '@prisma/client';

export default async function Page() {
  let evs: Evidence[] = await prisma.evidence.findMany();
  
  return (
    <div className="w-full">
      <div className="flex-row w-1/2 mx-auto items-center justify-between">
        <h2 className={`text-2xl`}>Gunthorpe, Buildings 1</h2>
        <h1 className={`text-bold text-4xl`}>AHL1 - Pollinator Mix</h1>
        {/* <div className='flex gap-4'>
          <GenericButton text='Generate Report'></GenericButton>
        </div> */}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <div className="w-1/2 mx-auto grid p-4">
        <div className="flex items-center bg-white py-4 border-y-2">
          <div className="flex-1 text-lg font-bold">Date</div>
          <div className="text-lg font-bold">Title</div>
        </div>
        {evs.map((ev) => (
          <div key={ev.id} className="flex items-center bg-white py-4 border-b-2">
            <div className="flex-1 text-sm text-gray-500 font-bold">
              {ev.date.getDate()}/{ev.date.getMonth() + 1}
            </div>
            <div className="text-lg">{ev.title}</div>
          </div>
        ))}
      </div>
      <div className="w-1/2 pt-4 mx-auto">
        <GenericButton  text='Upload Evidence'></GenericButton>
      </div>
    </div>
  );
}