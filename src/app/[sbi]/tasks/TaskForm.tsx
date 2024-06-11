"use client";

import Link from "next/link";
import { createTask } from "@/app/server-actions/task";
import { ChangeEvent, useState } from "react";
import Submit from "@/app/components/Submit";
import { Action, LandParcel } from "@prisma/client";
import { MultiSelect } from '@mantine/core';
import { fetchActionParcelsOnFarm } from "@/app/server-actions/action";

export default function TaskForm({ sbi, actCode, parcelId, actions }: { sbi: string, actCode?: string, parcelId?: string, actions: Action[] }) {
  const [error, setError] = useState<string | null>(null);
  const [parcels, setParcels] = useState<LandParcel[]>([]);

  const handleSubmit = async (formData: FormData) => {
    if (actCode) {
      formData.append('actCode', actCode);
    }
    if (parcelId) {
      formData.append('parcelId', parcelId);
    }
    try {
      await createTask(sbi, formData);
    } catch (error) {
      setError('Failed to submit form');
    }
  };

  const handleActionChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const actionParcels = await fetchActionParcelsOnFarm(sbi, e.target.value);
    setParcels(actionParcels);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">New Task</h1>
      { error && <p className="text-red-500 text-sm mb-5">{error}</p> }
      <form className="w-full sm:w-3/4 xl:w-1/2" action={handleSubmit}>

        <div className="label">
          <label htmlFor="title" className="label-text">Title</label>
        </div>
        <input type="text" id="title" name="title" className="input input-bordered w-full" required />

        <div className="label">
          <label htmlFor="deadline" className="label-text">Deadline</label>
        </div>
        <input type="date" id="deadline" name="deadline" className="input input-bordered w-full" required/>

        { (actCode == null || parcelId == null) &&
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">
                <label htmlFor="actCode" className="label-text">Select an action</label>
              </div>
              <select id="actCode" name="actCode" className="select select-bordered w-full" onChange={handleActionChange} defaultValue="DEFAULT" >
                <option value="DEFAULT" disabled>Choose action</option>
                { actions.map((action) => <option key={action.code} value={action.code}>{action.code}</option>) }
              </select>
            </div>
            <MultiSelect
              label="Select relevant land parcels"
              placeholder="Select parcels"
              name="parcelIds"
              data={parcels.map((parcel) => { return { value: parcel.id, label: `${parcel.name} (${parcel.id})` }})}
              classNames={{ label: "label-text p-2" }}
              styles={{ label: { fontWeight: 400 }}}
            />
          </div>
        }

        <div className="label">
          <label htmlFor="description" className="label-text">Description</label>
        </div>
        <textarea id="description" name="description" className="textarea textarea-bordered w-full" required/>

        <div className="mt-6 flex justify-end gap-4">
          <Link href={{ pathname: `/${sbi}/tasks` }}>
            <button className="btn btn-content-neutral">Cancel</button>
          </Link>
          <Submit text="Create Task" />
        </div>
      </form>
    </div>
  );
}
