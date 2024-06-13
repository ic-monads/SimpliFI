import { LandParcel } from "@prisma/client";
import Link from "next/link"

export function ParcelBadges({ sbi, parcels, link } : { sbi: string, parcels: LandParcel[], link: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {parcels.map((parcel) => 
        link ?
          <Link href={`/${sbi}/parcels/${parcel.id}`} key={parcel.id} className="badge badge-ghost hover:bg-gray-300 text-xs mr-2 truncate">
            <span className="truncate">
              {parcel.name} ({parcel.id})
            </span>
          </Link>
          :
          <span key={parcel.id} className="badge badge-ghost text-xs mr-2 truncate">
            <span className="truncate">
              {parcel.name} ({parcel.id})
            </span>
          </span>
      )}
    </div>
  )
}