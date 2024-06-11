import { createOptionsForParcel } from '@/app/server-actions/option';
import Submit from '@/app/components/Submit';
import CancelButton from "@/app/components/CancelButton";
import { fetchParcelName, fetchActionsMissingForParcel } from '@/app/server-actions/land-parcel';
import { MultiSelect } from '@mantine/core';

export default async function Page({ params }: { params: { sbi: string, parcelId: string } }) {
  const { sbi, parcelId } = params;
  const name = await fetchParcelName(parcelId);
  /* TODO: Change to be actions that a farmer is performing */
  const actions = await fetchActionsMissingForParcel(parcelId);
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">Add Action to {name}</h1>
      <form className="max-w-md" action={createOptionsForParcel.bind(null, params.sbi, params.parcelId)}>
        <MultiSelect
          label="Select SFI actions to add on this parcel"
          placeholder="Select actions"
          name="actionCode"
          data={actions.map((a) => { return { value: a.code, label: `${a.code}: ${a.name}`}})}
          classNames={{ label: "label-text p-2"}}
          styles={{ label: { frontWeight: 400 }}}
          searchable
        />
        <div className="mt-6 flex justify-end gap-4">
          <CancelButton />
          <Submit text="Create Option" />
        </div>
      </form>
    </div>
  )
}
