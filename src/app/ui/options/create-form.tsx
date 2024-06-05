import type { Action, LandParcel } from '@prisma/client';
import Link from 'next/link';
import { createOption } from '@/app/lib/actions';
import Submit from '@/app/ui/submit';

export default function Form({ actions, parcels }: { actions: Action[], parcels: LandParcel[] }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">Add Option</h1>
      <form className="max-w-md" action={createOption}>
        <div className="label">
          <label htmlFor="actions" className="label-text">Select SFI Action</label>
        </div>
        <select id="actions" name="actionCode" className="select select-bordered w-full" required>
          <option disabled selected>Choose Action</option>
          {actions.map((a) => <option key={a.code}>{a.code}</option>)}
        </select>
        <div className="label">
          <label htmlFor="parcels" className="label-text">Select Land Parcel</label>
        </div>
        <select id="actions" name="actionCode" className="select select-bordered w-full" required>
          <option disabled selected>Choose Parcel</option>
          {parcels.map((p) => <option key={p.id}>{`${p.name} (${p.id})`}</option>)}
        </select>
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/options">
            <button className="btn btn-neutral-content">Cancel</button>
          </Link>
          <Submit text="Create Option" />
        </div>
      </form>
    </div>
  );
}