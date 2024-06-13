import Submit from "@/app/components/Submit";
import { createFarm } from "@/app/server-actions/farm";
import Link from "next/link";

export default function Page() {
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
            <label htmlFor="agreementStart" className="label-text">Agreement Start Date</label>
          </div>
          <input type="date" id="agreementStart" name="agreementStart" className="input input-bordered w-full" />
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/login" type="button">
              <button className="btn" type="button">Log In Instead</button>
            </Link>
            <Submit text="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}