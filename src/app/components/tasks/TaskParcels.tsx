import { fetchTaskParcels } from "@/app/server-actions/task";
import { ParcelBadges } from "../ParcelBadges";

export default async function TaskParcels({ taskId }: { taskId: string }) {
  const parcels = await fetchTaskParcels(taskId);
  return (<ParcelBadges parcels={parcels} />)
}