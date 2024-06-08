import Form from "@/app/components/tasks/form";
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
    <Form actCode={searchParams.actCode} parcelId={searchParams.parcelId} actions={actions} />
  )
}
