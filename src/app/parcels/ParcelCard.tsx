import Link from "next/link";
import { Action } from "@prisma/client";
import { ParcelBadges } from "@/app/components/ParcelBadges";
import { Parcel } from "@/app/lib/types";

export function ParcelCard({ parcel } : { parcel: Parcel }) {
    function getOptions(parcel: Parcel) {
      return parcel.options
    }

    return (
      <Link href={`/parcels/${parcel.id}`}>
        <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
          <p className="text-xs">{parcel.id}</p>
          <h2 className="text-md font-medium">{parcel.name}</h2>
          {/* <ParcelBadges parcels={getParcels(action)} /> */}
        </div>
      </Link>
    )
}
