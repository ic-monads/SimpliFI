import TaskForm from "@/app/components/tasks/TaskForm";
import { fetchAllActions, fetchLandParcels } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams: {
    actCode?: string,
    parcelId?: string
  };
}) {
  const [actions, parcels] = await Promise.all([fetchAllActions(), fetchLandParcels()]);

  return(
    <TaskForm actCode={searchParams.actCode} parcelId={searchParams.parcelId} actions={actions} />
  )
}
