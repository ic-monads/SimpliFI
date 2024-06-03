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
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                Title
              </th>
              <th scope="col">
                Date
              </th>
              <th scope="col">
                File
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((ev) => (
              <tr key={ev.id}>
                <th scope="row">
                  {ev.title}
                </th>
                <td>
                  {new Date(ev.date).toLocaleDateString()}
                </td>
                <td>
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
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}