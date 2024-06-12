import TaskForm from "../TaskForm";
import { fetchFarmActions } from '@/app/server-actions/action';

export default async function Page({ params }: { params: { sbi: string, actCode?: string, parcelId?: string } }) {
  const { sbi, actCode, parcelId } = params;
  const actions = await fetchFarmActions(sbi);

  return(
    <TaskForm sbi={sbi} actCode={actCode} parcelId={parcelId} actions={actions} />
  )
}
