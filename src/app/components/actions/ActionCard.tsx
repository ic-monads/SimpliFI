import Link from "next/link";
import { Action } from "@prisma/client";
import { ParcelBadges } from "../ParcelBadges";
import { ActionWithParcels } from "@/app/lib/data";

export function ActionCard({ action } : { action: ActionWithParcels }) {
    function getParcels(action: ActionWithParcels) {
      return action.options.map((option) => option.parcel);
    }

    return (
      <Link href={`/actions/${action.code}`}>
        <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
          <p className="text-xs">{action.code}</p>
          <h2 className="text-md font-medium">{action.name}</h2>
          <ParcelBadges parcels={getParcels(action)} />
        </div>
      </Link>
    )
}
