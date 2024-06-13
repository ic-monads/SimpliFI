import Submit from "@/app/components/Submit";
import { createFarm } from "@/app/server-actions/farm";
import Link from "next/link";

export default function SignupForm() {

  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto mt-10">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
        <form className="" action={createFarm}>
          <div className="label">
            <label htmlFor="sbi" className="label-text">SBI</label>
          </div>
          <input type="text" id="sbi" name="sbi" className="input input-bordered w-full" required />
          <div className="label">
            <label htmlFor="name" className="label-text">Farm Name</label>
          </div>
          <input type="text" id="name" name="name" className="input input-bordered w-full" required />
          <div className="label">
            <label htmlFor="startAg" className="label-text">Agreement Start Date</label>
          </div>
          <input type="date" id="startAg" name="startAg" className="input input-bordered w-full" />
          <div className="label">
            <label htmlFor="endAg" className="label-text">Agreement End Date</label>
          </div>
          <input type="date" id="endAg" name="endAg" className="input input-bordered w-full" />
          <div className="label">
            <label htmlFor="renewAg" className="label-text">Agreement Renewal Date</label>
          </div>
          <input type="date" id="renewAg" name="renewAg" className="input input-bordered w-full" />
          <div className="mt-6 flex justify-center gap-4">          
            <Link href="/login">
              <button className="btn">Log In Instead</button>
            </Link>
            <Submit text="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}