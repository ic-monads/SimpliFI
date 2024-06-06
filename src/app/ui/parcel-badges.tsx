import { LandParcel } from "@prisma/client";

export function ParcelBadges({ parcels } : { parcels: LandParcel[] }) {
  return (
    <div className="flex flex-wrap">
      { parcels.map((parcel) => <div key={parcel.id} className="badge badge-outline text-xs mr-2 mt-2 text-nowrap">{parcel.name} ({parcel.id})</div>) }
    </div>
  )
}