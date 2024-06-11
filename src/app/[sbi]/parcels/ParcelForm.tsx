"use client";

import Link from "next/link";
import { createParcel } from "@/app/server-actions/land-parcel";
import { ChangeEvent, useState } from "react";
import Submit from "@/app/components/Submit";
import React from "react";
import { Action } from "@prisma/client";
import { MultiSelect } from "@mantine/core";

export default function ParcelForm({ sbi, actions }: { sbi: string, actions: Action[]}) {
    const [error, setError] = useState<string | null>(null);
    // const [actions, setActions] = useState<Action[]>([]);

    const handleSubmit = async (formData: FormData) => {
      formData.append('sbi', sbi);
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
                    <label htmlFor="id" className="label-text">RPA ID</label>
                </div>
                <input type="text" id="id" name="id" className="input input-bordered w-full" required />

                <div className="label">
                    <label htmlFor="name" className="label-text">Name</label>
                </div>
                <input type="text" id="name" name="name" className="input input-bordered w-full" required />

                <MultiSelect
                  label="Select SFI actions performed on this parcel"
                  placeholder="Select actions"
                  name="actions"
                  data={actions.map((action) => { return { value: action.code, label: `${action.code}: ${action.name})` }})}
                  classNames={{ label: "label-text p-2" }}
                  styles={{ label: { fontWeight: 400 }}}
                  searchable
                />

                <div className="mt-6 flex justify-end gap-4">
                    <Link href={`/${sbi}/parcels`}>
                        <button className="btn btn-content-neutral">Cancel</button>
                    </Link>
                    <Submit text="Create Parcel" />
                </div>
            </form>
        </div>
    );
}
