import Link from "next/link";
import { ParcelWithActions } from "@/app/lib/types";
import { Action } from "@prisma/client";
import ActionBadges from "@/app/components/ActionBadges";

export function ParcelCard({ parcel } : { parcel: ParcelWithActions }) {
    function getActions(parcel: ParcelWithActions) {
      return parcel.options.map((option) => option.action)
    }

    return (
      <Link href={`/${parcel.sbi}/parcels/${parcel.id}`}>
        <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
          <p className="text-xs">{parcel.id}</p>
          <h2 className="text-md font-medium mb-3">{parcel.name}</h2>
          <ActionBadges sbi={parcel.sbi} actions={getActions(parcel)} link={false} />
        </div>
      </Link>
    )
}
