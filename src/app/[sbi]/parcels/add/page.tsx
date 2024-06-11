import ParcelForm from '../ParcelForm';
import { fetchAllActions } from '@/app/server-actions/action'

export default async function Page({ params }: { params: { sbi: string } }) {
  const actions = await fetchAllActions();

  return(
    <ParcelForm sbi={params.sbi} actions={actions} />
  )
}
