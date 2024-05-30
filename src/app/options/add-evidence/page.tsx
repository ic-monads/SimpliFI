"use client"; // This is a client-side component

import { useState } from "react";
import prisma from '@/app/lib/prisma';
import { useRouter } from "next/navigation";

export default function Page() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(title, date);
        try {
            let newDate = new Date(date);
            const body = { 
                title,
                newDate
            };
            await fetch('/api/evidence', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            await router.push('/options/option');
          } catch (error) {
            console.error(error);
          }
    }

    return (
        <div className="mx-auto">
            <h1 className="font-semibold text-xl mb-2">Add Evidence</h1>
            <form className="max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                    <input type="date" onChange={(e) => setDate(e.target.value)} value={date} id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"/>
                </div>
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" type="submit">Submit</button>
            </form>
        </div>
    )
}