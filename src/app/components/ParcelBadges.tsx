import { LandParcel } from "@prisma/client";

export function ParcelBadges({ parcels } : { parcels: LandParcel[] }) {
  return (
    <div className="flex gap-y-2">
      {parcels.map((parcel) => 
        <div key={parcel.id} className="badge badge-ghost text-xs mr-2 truncate">
          <span className="truncate">
            {parcel.name} ({parcel.id})
          </span>
        </div>
      )}
    </div>
  )
}