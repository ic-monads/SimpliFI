import TaskForm from "../TaskForm";
import { fetchAllActions } from '@/app/server-actions/action';
import { fetchLandParcels } from '@/app/server-actions/land-parcel'

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
