import { LandParcel } from "@prisma/client";

export function ParcelBadges({ parcels } : { parcels: LandParcel[] }) {
  return (
    <div className="flex overflow-hidden gap-y-2">
      {parcels.map((parcel) => 
      <div key={parcel.id} className="badge badge-ghost text-xs mr-2 mt-2 max-w-[33%] overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block align-top truncate">
            {parcel.name} ({parcel.id})
          </span>
        </div>
      )}
    </div>
  )
}