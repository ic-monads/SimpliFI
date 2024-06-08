import { createOption } from '@/app/server-actions/option';
import { fetchLandParcels } from '@/app/server-actions/land-parcel';
import Submit from '@/app/components/Submit';
import CancelButton from "@/app/components/CancelButton";

export default async function Page({
  searchParams
} : {
  searchParams: {
    actCode: string
  }
}) {
  /* TODO: Change to be actions that a farmer is performing */
  const parcels = await fetchLandParcels();
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">Add Option</h1>
      <form className="max-w-md" action={createOption.bind(null, searchParams.actCode)}>
        <div className="label">
          <label htmlFor="parcels" className="label-text">Select Land Parcel</label>
        </div>
        <select id="parcels" name="parcelId" className="select select-bordered w-full" required>
          <option disabled selected>Choose Parcel</option>
          {parcels.map((p) => <option key={p.id} value={p.id}>{`${p.name} (${p.id})`}</option>)}
        </select>
        <div className="mt-6 flex justify-end gap-4">
          <CancelButton />
          <Submit text="Create Option" />
        </div>
      </form>
    </div>
  )
}
