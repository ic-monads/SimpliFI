"use client";

import type { Evidence } from '@prisma/client';
import Link from "next/link";
import useSWR from "swr";

export default function Page() {
  const { data } = useSWR("/api/evidence", (url) => fetch(url).then((res) => res.json()).then((data) => data as Evidence[]));
  
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
        {data && data.map((ev) => (
          <div key={ev.id} className="flex items-center bg-white py-4 border-b-2">
            <div className="flex-1 text-sm text-gray-500 font-bold">
              {new Date(ev.date).getDate()}/{new Date(ev.date).getMonth() + 1}
            </div>
            <div className="text-lg">{ev.title}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <Link className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" href="/options/add-evidence">Add Evidence</Link>
    </div>
  );
}
