import type { Action, LandParcel } from '@prisma/client';
import Link from 'next/link';
import { Button, Label, Select } from "flowbite-react";
import { createOption } from '@/app/lib/actions';

export default function Form({ actions, parcels }: { actions: Action[], parcels: LandParcel[] }) {
  return (
    <form action={createOption}>
      <h1 className="font-semibold text-3xl">Add Option</h1>
      <div className="max-w-md">
        <div className="label">
          <label htmlFor="actions" className="label-text">Select SFI Action</label>
        </div>
        <select id="actions" name="actionCode" className="select select-bordered max-w-md" required>
          <option disabled selected>Choose Action</option>
          {actions.map((a) => <option key={a.code}>{a.name}</option>)}
        </select>
        <div className="label">
          <label htmlFor="parcels" className="label-text">Select Land Parcel</label>
        </div>
        <select id="actions" name="actionCode" className="select select-bordered" required>
          <option disabled selected>Choose Parcel</option>
          {parcels.map((p) => <option key={p.id}>{`${p.name} (${p.id})`}</option>)}
        </select>
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/options">
            <button className="btn btn-neutral-content">Cancel</button>
          </Link>
          <button className="btn btn-primary" type="submit">Create Option</button>
        </div>
      </div>
    </form>
  );
}