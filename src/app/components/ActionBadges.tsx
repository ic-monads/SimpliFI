import { Action } from "@prisma/client";

export default function ActionBadges({ actions } : { actions: Action[] }) {
  return (
    <div className="flex flex-wrap gap-y-2">
      {actions.map((action) => 
        <div key={action.code} className="badge badge-ghost text-xs mr-2 truncate">
          <span className="truncate">{action.name} ({action.code})</span>
        </div>
      )}
    </div>
  );
}
