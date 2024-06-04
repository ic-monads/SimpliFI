"use client";

import Link from "next/link";
import { createTask } from "@/app/lib/actions";
import { useState } from "react";
import Submit from "@/app/ui/submit";

export default function Form({ actCode, parcelId }: { actCode: string, parcelId: string }) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    formData.append('actCode', actCode);
    formData.append('parcelId', parcelId);
    try {
      await createTask(formData);
    } catch (error) {
      setError('Failed to submit form');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl mb-3">New Task</h1>
      { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
      <form className="w-1/2" action={handleSubmit}>

        <div className="label">
          <label htmlFor="title" className="label-text">Title</label>
        </div>
        <input type="text" id="title" name="title" className="input input-bordered w-full" required />

        <div className="label">
          <label htmlFor="deadline" className="label-text">Deadline</label>
        </div>
        <input type="date" id="deadline" name="deadline" className="input input-bordered w-full" required/>

        <div className="label">
          <label htmlFor="description" className="label-text">Description</label>
        </div>
        <textarea id="description" name="description" className="textarea textarea-bordered w-full" required/>

        <div className="mt-6 flex justify-end gap-4">
          <Link href={{ pathname: "/tasks" }}>
            <button className="btn btn-content-neutral">Cancel</button>
          </Link>
          <Submit text="Create Task" />
        </div>
      </form>
    </div>
  );
}