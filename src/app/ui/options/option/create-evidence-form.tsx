'use client';

import Link from "next/link";
import { createEvidence } from "@/app/lib/actions";
import React, { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { Button } from "flowbite-react";

  
export default function Form({ actCode, parcelId }: { actCode: string, parcelId: string}) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    let fileUrl = "";
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
                      console.log("Attempting file upload");
                      const file = fileInputRef.current.files[0];
                      const blob = await upload(file.name, file, {
                          access: "public",
                          handleUploadUrl: "/api/evidence/handle-upload",
                      });
                      fileUrl = blob.url;
                      formData.append('fileUrl', fileUrl)
                  }
    try {
      // Send the FormData object to the server action
      await createEvidence(formData);
    } catch (error) {
      setError('Failed to submit form');
    }
  };

  return (
    <div className="mx-auto">
            <h1 className="font-semibold text-xl mb-2">Add Evidence</h1>
            { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
            <form className="max-w-sm" action={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="mb-5">
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                  <input type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" required/>
              </div>
              <div className="mb-5">
                  <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">File</label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" ref={fileInputRef} id="file" name="file" required />
              </div>
              <div className="mb-5">
                  <label htmlFor="actCode" className="block mb-2 text-sm font-medium text-gray-900">Action Code</label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="actCode" name="actCode" type="text" value={actCode} readOnly/>
              </div>
              <div className="mb-5">
                  <label htmlFor="parcelId" className="block mb-2 text-sm font-medium text-gray-900">Parcel Id</label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="parcelId" name="parcelId"type="text" value={parcelId} readOnly/>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Link href={{
                  pathname: "/options/option",
                  query: { action: actCode, parcel: parcelId }
                }}>
                  <Button color={"light"}>Cancel</Button>
                </Link>
                <Button color={"success"} type="submit">Submit Evidence</Button>
              </div>
            </form>
        </div>
  )
}