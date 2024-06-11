import { createOptionForParcel } from '@/app/server-actions/option';
import Submit from '@/app/components/Submit';
import CancelButton from "@/app/components/CancelButton";
import { fetchAllActions } from '@/app/server-actions/action';

export default async function Page({ params }: { params: { parcelId: string } }) {
  /* TODO: Change to be actions that a farmer is performing */
  const actions = await fetchAllActions();
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">Add Option</h1>
      <form className="max-w-md" action={createOptionForParcel.bind(null, params.parcelId)}>
        <div className="label">
          <label htmlFor="actions" className="label-text">Select SFI Action</label>
        </div>
        <select id="actions" name="actionCode" className="select select-bordered w-full" required>
          <option disabled selected>Choose Action</option>
          {actions.map((a) => <option key={a.code} value={a.code}>{`${a.name} (${a.code})`}</option>)}
        </select>
        <div className="mt-6 flex justify-end gap-4">
          <CancelButton />
          <Submit text="Create Option" />
        </div>
      </form>
    </div>
  )
}
