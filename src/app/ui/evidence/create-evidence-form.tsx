'use client';

import Link from "next/link";
import { createEvidence } from "@/app/lib/actions";
import React, { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import Submit from "@/app/ui/submit";
import { LandParcel } from "@prisma/client";
  
export default function Form({ 
  actCode, parcels, taskId, reqEvId,
  evTitle, taskName, fromTask 
}: { 
  actCode: string, parcels: LandParcel[], taskId?: string, reqEvId?: string, 
  evTitle?: string, taskName?: string, fromTask: string 
}) {
  const [error, setError] = useState<string | null>(null);

  // const status = useFormStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async (formData: FormData) => {
    formData.append('actCode', actCode);
    if (taskId) {
      formData.append('taskId', taskId);
    }
    if (reqEvId) {
      formData.append('reqEvId', reqEvId);
    }
    formData.append('fromTask', fromTask);
    // setLoading(true);
    // console.log(`Loading set to ${loading}`);
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
    finally {
      // setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">Add Evidence</h1>
      { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
      <form className="max-w-md" action={handleSubmit}>
        <p className="text-sm mb-2">SFI Action: {actCode}</p>
        { taskId && <p className="font-semibold mb-2">For Task: {taskName}</p>}
        <div className="label">
          <label htmlFor="title" className="label-text">Title</label>
        </div>
        <input type="text" id="title" name="title" defaultValue={evTitle}  className="input input-bordered w-full" required />
        <div className="label">
          <label htmlFor="date" className="label-text">Date</label>
        </div>
        <input type="date" id="date" name="date" className="input input-bordered w-full" required/>
        <div className="label">
          <label htmlFor="notes" className="label-text">Notes</label>
        </div>
        <textarea id="notes" name="notes" className="textarea textarea-bordered w-full" required/>
        <div className="label">
          <label htmlFor="parcelId" className="label-text">Select Parcel</label>
        </div>
        <select className="select select-bordered w-full max-w-xs" id="parcelId" name="parcelId">
          <option disabled selected>For Parcel</option>
          {parcels.map((p) => (
            <option key={p.id} value={p.id}>{p.name} - {p.id}</option>
          ))}
        </select>
        <div className="label">
          <label htmlFor="file" className="label-text">File</label>
        </div>
        <input className="file-input file-input-bordered w-full" type="file" ref={fileInputRef} id="file" name="file" required />
        <div className="mt-6 flex justify-end gap-4">
          <Link href={(fromTask == 'true') ? {
            pathname: `/tasks/${taskId}`
          } : {
            pathname: `/actions/${actCode}`
          }}>
            <button className="btn btn-content-neutral">Cancel</button>
          </Link>
          <Submit text="Submit Evidence" />
        </div>
      </form>
    </div>
  )
}