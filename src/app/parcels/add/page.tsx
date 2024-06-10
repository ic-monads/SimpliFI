import ParcelForm from '../ParcelForm';
import { fetchAllActions } from '@/app/server-actions/action';
// import { fetchLandParcels } from '@/app/server-actions/land-parcel'

export default async function Page() {
//   const actions = await Promise.all(fetchAllActions());

  return(
    <ParcelForm />
  )
}
