import Link from "next/link";
import { Action } from "@prisma/client";

export function Card({ action } : { action: Action }) {
    return (
      <Link href={`/actions/${action.code}`}>
        <div className="card shadow-sm p-3 border hover:bg-gray-100 transition-all">
          <p className="text-xs">{action.code}</p>
          <h2 className="text-md font-medium mb-3">{action.name}</h2>
        </div>
      </Link>
    )
}