'use client';

import Link from "next/link";
import { createEvidence } from "@/app/lib/actions";
import React, { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";

  
export default function Form({ actCode, parcelId }: { actCode: string, parcelId: string}) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
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
      <form className="max-w-sm form-control" action={handleSubmit}>
        <div className="label">
          <label htmlFor="title" className="label-text">Title</label>
        </div>
        <input type="text" id="title" name="title" className="input input-bordered" required />
        <div className="label">
          <label htmlFor="date" className="label-text">Date</label>
        </div>
        <input type="date" id="date" name="date" className="input input-bordered" required/>
        <div className="label">
          <label htmlFor="file" className="label-text">File</label>
        </div>
        <input className="file-input file-input-bordered" type="file" ref={fileInputRef} id="file" name="file" required />
        <div className="label">
          <label htmlFor="actCode" className="label-text">Action Code</label>
        </div>
        <input className="input input-bordered" id="actCode" name="actCode" type="text" value={actCode} readOnly/>
        <div className="label">
          <label htmlFor="parcelId" className="label-text">Parcel Id</label>
        </div>
        <input className="input input-bordered" id="parcelId" name="parcelId" type="text" value={parcelId} readOnly/>
        <div className="mt-6 flex justify-end gap-4">
          <Link href={{
            pathname: "/options/option",
            query: { action: actCode, parcel: parcelId }
          }}>
            <button className="btn btn-neutral-content">Cancel</button>
          </Link>
          <button className="btn btn-primary" type="submit">Submit Evidence</button>
        </div>
      </form>
    </div>
  )
}