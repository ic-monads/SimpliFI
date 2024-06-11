import { Action } from "@prisma/client";

export default function ActionBadges({ actions } : { actions: Action[] }) {
  return (
    <div className="flex flex-wrap">
      { actions.map((action) => <div key={action.code} className="badge badge-ghost text-xs mr-2 mt-2 text-nowrap">{action.name} ({action.code})</div>) }
    </div>
  )
}