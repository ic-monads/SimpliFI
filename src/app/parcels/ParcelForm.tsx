"use client";

import Link from "next/link";
import { createParcel } from "@/app/server-actions/land-parcel";
import { ChangeEvent, useState } from "react";
import Submit from "@/app/components/Submit";
import React from "react";

export default function ParcelForm() {
    const [error, setError] = useState<string | null>(null);
    // const [actions, setActions] = useState<Action[]>([]);

    const handleSubmit = async (formData: FormData) => {
        try {
            await createParcel(formData);
        } catch (error) {
            setError('Failed to submit form');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-semibold text-2xl mb-3">New Parcel</h1>
            {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
            <form className="w-full sm:w-3/4 xl:w-1/2" action={handleSubmit}>


                <div className="label">
                    <label htmlFor="id" className="label-text">ID</label>
                </div>
                <input type="text" id="id" name="id" className="input input-bordered w-full" required />


                <div className="label">
                    <label htmlFor="name" className="label-text">Name</label>
                </div>
                <input type="text" id="name" name="name" className="input input-bordered w-full" required />

                {/* { (actCode == null || parcelId == null) &&
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="label">
                <label htmlFor="actCode" className="label-text">Select an action</label>
              </div>
              <select id="actCode" name="actCode" className="select select-bordered w-full" onChange={handleActionChange} defaultValue="DEFAULT" >
                <option value="DEFAULT" disabled>Choose actions</option>
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
        } */}

                {/* <div className="label">
          <label htmlFor="description" className="label-text">Description</label>
        </div>
        <textarea id="description" name="description" className="textarea textarea-bordered w-full" required/> */}

                <div className="mt-6 flex justify-end gap-4">
                    <Link href={{ pathname: "/parcels" }}>
                        <button className="btn btn-content-neutral">Cancel</button>
                    </Link>
                    <Submit text="Create Parcel" />
                </div>
            </form>
        </div>
    );
}
