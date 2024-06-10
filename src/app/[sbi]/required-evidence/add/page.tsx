"use client";

import { useState } from "react";
import Submit from "@/app/components/Submit";
import { createRequiredEvidence } from "@/app/server-actions/required-evidence";
import CancelButton from "@/app/components/CancelButton";

export default function Page({ params }: { params: { sbi: string, taskId: string, taskName: string } }) {
    const [error, setError] = useState<string | null>(null);
    const { sbi, taskId, taskName } = params;

    const handleSubmit = async (formData: FormData) => {
      formData.append('taskId', taskId);
      try {
        await createRequiredEvidence(sbi, formData);
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
            <CancelButton />
            <Submit text="Add Required Evidence" />
          </div>
        </form>
      </div>
    )
}
