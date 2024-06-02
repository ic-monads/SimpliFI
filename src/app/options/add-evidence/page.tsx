"use client"; // This is a client-side component

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

export default function Page() {
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [inputDate, setInputDate] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        try {
            let newDate = new Date(inputDate);
            let fileUrl = "";

            if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
                console.log("Attempting file upload");
                const file = fileInputRef.current.files[0];
                const blob = await upload(file.name, file, {
                    access: "public",
                    handleUploadUrl: "/api/evidence/handle-upload",
                });
                fileUrl = blob.url;
            }

            const body = { 
                title,
                date: newDate,
                fileUrl
            };
            await fetch('/api/evidence', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body),
            });
            await router.push('/options/option');
        } catch (error) {
            console.error(error);
            setError((error as Error).message);
        }
    }

    return (
        <div className="mx-auto">
            <h1 className="font-semibold text-xl mb-2">Add Evidence</h1>
            { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
            <form className="max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title *</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" required/>
                </div>
                <div className="mb-5">
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                    <input type="date" onChange={(e) => setInputDate(e.target.value)} value={inputDate} id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">File</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" ref={fileInputRef} id="file" type="file" />
                </div>
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" type="submit">Submit</button>
            </form>
        </div>
    )
}