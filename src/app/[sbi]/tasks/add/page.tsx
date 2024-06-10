import TaskForm from "../TaskForm";
import { fetchFarmActions } from '@/app/server-actions/action';
import { fetchLandParcels } from '@/app/server-actions/land-parcel'

export default async function Page({ params }: { params: { sbi: string, actCode?: string, parcelId?: string } }) {
  const { sbi, actCode, parcelId } = params;
  const [actions, parcels] = await Promise.all([fetchFarmActions(sbi), fetchLandParcels()]);

  return(
    <TaskForm sbi={sbi} actCode={actCode} parcelId={parcelId} actions={actions} />
  )
}
