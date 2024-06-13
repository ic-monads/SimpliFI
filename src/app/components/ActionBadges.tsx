import { Action } from "@prisma/client";
import Link from "next/link";

export default function ActionBadges({ sbi, actions, link } : { sbi: string, actions: Action[], link: boolean }) {
  return (
    <div className="flex flex-wrap gap-y-2">
      {actions.map((action) => 
        link ? 
          <Link href={`/${sbi}/actions/${action.code}`} key={action.code} className="badge badge-ghost hover:bg-gray-300 text-xs mr-2 truncate">
            <span className="truncate">{action.name} ({action.code})</span>
          </Link>
        :
          <div key={action.code} className="badge badge-ghost text-xs mr-2 truncate">
            <span className="truncate">{action.name} ({action.code})</span>
          </div>
      )}
    </div>
  );
}
