import Submit from "@/app/components/Submit";
import { ParcelFeature } from "@/app/lib/types";
import { useRef } from "react";
import SkipButton from "./SkipButton";
import NextButton from "./NextButton";

export default function ParcelForm({ parcel, updateParcelName, nextParcel, skipParcel, lastParcel }: { parcel: { id: string, name: string, feature: ParcelFeature }, updateParcelName: Function, nextParcel: Function, skipParcel: Function, lastParcel: boolean }) {
  const ref = useRef<HTMLFormElement>(null);

  function updateAction(formData: FormData) {
    updateParcelName(formData.get("name"));
    ref.current?.reset()
    nextParcel();
  }

  function skipAction(formData: FormData) {
    ref.current?.reset()
    skipParcel();
  }

  return (
    <form ref={ref}>
      <div className="label">
        <label htmlFor="id" className="label-text">Parcel ID</label>
      </div>
      <input type="text" name="id" className="input input-bordered w-full" disabled defaultValue={parcel.id} />

      <div className="label">
        <label htmlFor="name" className="label-text">Parcel Name</label>
      </div>
      <input type="text" name="name" className="input input-bordered w-full mb-3" required defaultValue={parcel.name} />
      <div className="flex flex-row space-x-3">
        <SkipButton action={skipAction} />
        <NextButton action={updateAction} lastParcel={lastParcel} />
      </div>
      
    </form>
  )
}