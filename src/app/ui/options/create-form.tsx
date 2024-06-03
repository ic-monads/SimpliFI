import type { Action, LandParcel } from '@prisma/client';
import Link from 'next/link';
import { Button, Label, Select } from "flowbite-react";
import { createOption } from '@/app/lib/actions';

export default function Form({ actions, parcels }: { actions: Action[], parcels: LandParcel[] }) {
  return (
    <form action={createOption}>
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="actions" value="Select SFI Action" />
        </div>
        <Select id="actions" name="actionCode" required>
          {actions.map((a) => <option key={a.code}>{a.name}</option>)}
        </Select>
        <div className="mb-2 block">
          <Label htmlFor="parcels" value="Select Land Parcel" />
        </div>
        <Select id="parcels" name="parcelId" required>
          {parcels.map((p) => <option key={p.id}>{`${p.name}(${p.id})`}</option>)}
        </Select>
        <div className="mt-6 flex justify-end gap-4">
          <Link href="/options">
            <Button color={"light"}>Cancel</Button>
          </Link>
          <Button color={"success"} type="submit">Create Option</Button>
        </div>
      </div>
    </form>
  );
}