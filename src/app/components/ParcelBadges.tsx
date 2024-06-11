import { LandParcel } from "@prisma/client";

export function ParcelBadges({ parcels } : { parcels: LandParcel[] }) {
  return (
    <div className="flex flex-wrap gap-y-2">
      { parcels.map((parcel) => <div key={parcel.id} className="badge badge-ghost text-xs mr-2 text-nowrap">{parcel.name} ({parcel.id})</div>) }
    </div>
  )
}