import Submit from "@/app/components/Submit";
import { createFarm } from "@/app/server-actions/farm";

export default function SignupForm() {

  return (
    <div className="w-full flex justify-center">
      <h1>Sign Up</h1>
      <div className="mx-auto mt-10">
        <form className="max-w-sm" action={createFarm}>
          <div className="label">
            <label htmlFor="sbi" className="label-text">SBI</label>
          </div>
          <input type="text" id="sbi" name="sbi" className="input input-bordered w-full" required />
          <div className="label">
            <label htmlFor="name" className="label-text">Farm Name</label>
          </div>
          <input type="text" id="name" name="name" className="input input-bordered w-full" required />
          <div className="mt-6 flex justify-center gap-4">
            <Submit text="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  )
}