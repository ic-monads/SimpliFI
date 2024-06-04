import Form from '@/app/ui/options/create-form';
import { fetchAllActions, fetchLandParcels } from '@/app/lib/data';

export default async function Page() {
  /* TODO: Change to be actions that a farmer is performing */
  const [actions, parcels] = await Promise.all([fetchAllActions(), fetchLandParcels()]);
  return (
    <main>
      <Form actions={actions} parcels={parcels} />
    </main>
  )
}