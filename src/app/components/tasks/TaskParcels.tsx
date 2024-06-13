import { fetchTaskParcels } from "@/app/server-actions/task";
import { ParcelBadges } from "../ParcelBadges";

export default async function TaskParcels({ sbi, taskId }: { sbi: string, taskId: string }) {
  const parcels = await fetchTaskParcels(taskId);
  return (<ParcelBadges sbi={sbi} parcels={parcels} link={false} />)
}