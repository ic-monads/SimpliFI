"use client";

import { useState } from "react";
import Submit from "@/app/components/Submit";
import { createRequiredEvidence } from "@/app/server-actions/required-evidence";
import CancelButton from "@/app/components/CancelButton";
import { useSearchParams } from "next/navigation";

export default function Page({ params, searchParams }: { params: { sbi: string, id: string }, searchParams: { taskName: string,  } }) {
    const [error, setError] = useState<string | null>(null);
    const { sbi, id } = params;
    const { taskName } = searchParams;

    const handleSubmit = async (formData: FormData) => {
      formData.append('taskId', id);
      try {
        await createRequiredEvidence(sbi, formData);
      } catch (error) {
        setError('Failed to submit form');
      }

    }
    return (
      <div className="w-full flex justify-center">
        <div className="w-1/2">
          <h1 className="font-semibold text-xl mb-2">Add Required Evidence</h1>
          <p className="text-sm">Task: {taskName}</p>
          { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
          <form action={handleSubmit}>
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
      </div>
    )
}
