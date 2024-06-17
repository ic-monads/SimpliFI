import TaskForm from "../TaskForm";
import { fetchFarmActions } from '@/app/server-actions/action';

export default async function Page({ params, searchParams }: { params: { sbi: string }, searchParams: { actCode?: string } }) {
  const { sbi } = params;
  const { actCode } = searchParams;
  const actions = await fetchFarmActions(sbi);

  return(
    <TaskForm sbi={sbi} actCode={actCode} actions={actions} />
  )
}
