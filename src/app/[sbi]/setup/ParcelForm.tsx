import Submit from "@/app/components/Submit";
import { ParcelFeature } from "@/app/lib/types";
import { useRef } from "react";

export default function ParcelForm({ parcel, updateParcel, nextParcel, lastParcel }: { parcel: { id: string, name: string, feature: ParcelFeature }, updateParcel: Function, nextParcel: Function, lastParcel: boolean }) {
  const ref = useRef<HTMLFormElement>(null);

  function handleSubmit(formData: FormData) {
    updateParcel({ id: parcel.id, name: formData.get("name"), feature: parcel.feature });
    ref.current?.reset()
    nextParcel();
  }

  return (
    <form ref={ref} action={handleSubmit}>
      <div className="label">
        <label htmlFor="id" className="label-text">Parcel ID</label>
      </div>
      <input type="text" name="id" className="input input-bordered w-full" disabled defaultValue={parcel.id} />

      <div className="label">
        <label htmlFor="name" className="label-text">Parcel Name</label>
      </div>
      <input type="text" name="name" className="input input-bordered w-full mb-3" required defaultValue={parcel.name} />
      <div className="flex justify-center">
        <Submit text={lastParcel ? "Finish" : "Next Parcel"} />
      </div>
    </form>
  )
}