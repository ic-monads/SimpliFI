import Link from "next/link";
import { ParcelBadges } from "@/app/components/ParcelBadges";
import { ActionWithParcels } from "@/app/lib/types";

export function ActionCard({ sbi, action } : { sbi: string, action: ActionWithParcels }) {
    function getParcels(action: ActionWithParcels) {
      return action.options.map((option) => option.parcel);
    }

    return (
      <Link href={`/${sbi}/actions/${action.code}`}>
        <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
          <p className="text-xs">{action.code}</p>
          <h2 className="text-md font-medium">{action.name}</h2>
          <ParcelBadges parcels={getParcels(action)} />
        </div>
      </Link>
    )
}
