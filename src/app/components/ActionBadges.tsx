import { Action } from "@prisma/client";

export default function ActionBadges({ actions } : { actions: Action[] }) {
  return (
    <div className="flex overflow-hidden gap-y-2">
      {actions.map((action) => 
        <div key={action.code} className="badge badge-ghost text-xs mr-2 mt-2 max-w-[33%] overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block align-top truncate">{action.name} ({action.code})</span>
        </div>
      )}
    </div>
  );
}
