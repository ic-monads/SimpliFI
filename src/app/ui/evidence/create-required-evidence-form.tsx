"use client";

import React, { useRef, useState } from "react";
import Submit from "@/app/ui/submit";
import { createRequiredEvidence } from "@/app/lib/actions";
import Link from "next/link";

export default function Form({ taskId, taskName }: { taskId: string, taskName: string }) {
  console.log('Form', taskId, taskName);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    formData.append('taskId', taskId);
    try {
      await createRequiredEvidence(formData);
    } catch (error) {
      setError('Failed to submit form');
    }
    
  }
  return (
    <div className="mx-auto">
            <h1 className="font-semibold text-xl mb-2">Add Required Evidence</h1>
            <p className="font-semibold mb-2">For Task: {taskName}</p>
            { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
            <form className="max-w-sm" action={handleSubmit}>
              <div className="label">
                <label htmlFor="title" className="label-text">Title</label>
              </div>
              <input type="text" id="title" name="title" className="input input-bordered w-full" required />
              <div className="label">
                <label htmlFor="desc" className="label-text">Description</label>
              </div>
              <textarea id="desc" name="desc" className="textarea textarea-bordered w-full" required/>
              <div className="mt-6 flex justify-end gap-4">
                <Link href={`/tasks/${taskId}`}>
                  <button className="btn btn-content-neutral">Cancel</button>
                </Link>
                <Submit text="Add Required Evidence" />
              </div>
            </form>
        </div>
  )  
}