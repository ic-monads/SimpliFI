import Link from "next/link";
import { ParcelWithActions } from "@/app/lib/types";
import { Action } from "@prisma/client";
import ActionBadges from "@/app/components/ActionBadges";

export function ParcelCard({ parcel } : { parcel: ParcelWithActions }) {
    function getActions(parcel: ParcelWithActions) {
      return parcel.options.map((option) => option.action)
    }

    return (
      <Link href={`/parcels/${parcel.id}`}>
        <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
          <p className="text-xs">{parcel.id}</p>
          <h2 className="text-md font-medium">{parcel.name}</h2>
          <ActionBadges actions={getActions(parcel)} />
        </div>
      </Link>
    )
}