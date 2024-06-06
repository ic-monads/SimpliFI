import Form from '@/app/ui/options/create-form';
import { fetchLandParcels } from '@/app/lib/data';

export default async function Page({ 
  searchParams 
} : { 
  searchParams: { 
    actCode: string
  }
}) {
  /* TODO: Change to be actions that a farmer is performing */
  const parcels = await fetchLandParcels();
  return (
    <main>
      <Form actionId={searchParams.actCode} parcels={parcels} />
    </main>
  )
}