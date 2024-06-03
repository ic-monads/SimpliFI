"use client";

import type { Evidence } from '@prisma/client';
import { Button } from 'flowbite-react';
import Link from "next/link";
import useSWR from "swr";

export default function Page({
  searchParams,
}: {
  searchParams: {
    action: string;
    parcel: string;
  };
}) {
  const { data } = useSWR("/api/evidence", (url) => fetch(url).then((res) => res.json()).then((data) => data as Evidence[]));
  
  return (
    <div className="w-full">
      <div className="flex-row w-1/2 mx-auto items-center justify-between">
        <h2 className={`text-2xl`}>Parcel Name</h2>
        <h1 className={`text-bold text-4xl`}>Action Id & Description</h1>
      </div>
      <h2 className="text-xl font-semibold">Evidence</h2>
      <div className="my-5 mx-auto max-w-4xl relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                          File
                      </th>
                  </tr>
              </thead>
              <tbody>
                {data && data.map((ev) => (
                  <tr key={ev.id} className="bg-white dark:bg-gray-800">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {ev.title}
                      </th>
                      <td className="px-6 py-4">
                          {new Date(ev.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                          {ev.fileUrl}
                      </td>
                  </tr>
                ))}
              </tbody>
          </table>
      </div>
      <Link href={{
        pathname: "/options/option/add-evidence", 
        query: searchParams
        }}>
          <Button color={"success"}>Add Evidence</Button>
          </Link>
    </div>
  );
}