import ParcelForm from '../ParcelForm';
// import { fetchLandParcels } from '@/app/server-actions/land-parcel'

export default async function Page({ params }: { params: { sbi: string } }) {
//   const actions = await Promise.all(fetchAllActions());

  return(
    <ParcelForm sbi={params.sbi}/>
  )
}
