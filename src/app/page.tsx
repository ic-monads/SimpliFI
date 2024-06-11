import Submit from "@/app/components/Submit";
import { fetchFarm } from "@/app/server-actions/farm";
import { initialiseParcelsFromSBI } from "./server-actions/land-parcel";


export default function Home() {

  async function initialiseFarm(formData: FormData) {
    'use server'
    fetchFarm(formData);
    try {
      initialiseParcelsFromSBI(formData.get('sbi')!.toString());
    } catch (e) {
      console.error('Could not automate adding parcels from SBI');
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto mt-10">
        <form className="max-w-sm" action={initialiseFarm}>
          <div className="label">
            <label htmlFor="sbi" className="label-text">SBI</label>
          </div>
          <input type="text" id="sbi" name="sbi" className="input input-bordered w-full" required />
          <div className="label">
            <label htmlFor="name" className="label-text">Farm Name</label>
          </div>
          <input type="text" id="name" name="name" className="input input-bordered w-full" required />
          <div className="mt-6 flex justify-center gap-4">
            <Submit text="Manage my farm" />
          </div>
        </form>
      </div>
    </div>
  )
}
