import { fetchTaskParcels } from "@/app/lib/data";

export default async function TaskParcels({ taskId }: { taskId: string }) {
  const parcels = await fetchTaskParcels(taskId);
  return (
    <div className="flex flex-wrap">
      { parcels.map((parcel) => <div className="badge badge-outline text-xs mr-2 mt-2 text-nowrap">{parcel.name} ({parcel.id})</div>) }
    </div>
  )
}