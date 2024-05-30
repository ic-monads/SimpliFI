
import GenericButton from '@/app/ui/generic-button';
import prisma from '@/app/lib/prisma';
import { Evidence } from '@prisma/client';
import Link from "next/link";

export default async function Page() {
  let evs: Evidence[] = await prisma.evidence.findMany();
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">My Options</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <div className="mb-10">
        {evs.map((ev) => (
          <div key={ev.id}>
            {ev.title} - {ev.date.getDate()}/{ev.date.getMonth()}
          </div>
        ))}
      </div>
      <Link className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" href="/options/add-evidence">Add Evidence</Link>
    </div>
  );
}