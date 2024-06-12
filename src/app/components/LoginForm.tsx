import Submit from "./Submit";
import { attemptLogin } from "@/app/server-actions/farm";

export async function LoginForm() {


  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto my-10">
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        {/* {!response!.success && <p className="text-red-500 text-sm mb-5">{response!.message}</p>} */}
        <form className="max-w-sm" action={attemptLogin}>
          <div className="label">
            <label htmlFor="sbi" className="label-text">SBI</label>
          </div>
          <input type="text" id="sbi" name="sbi" className="input input-bordered w-full" required />
          <div className="mt-6 flex justify-center gap-4">
            <Submit text="Manage my farm" />
          </div>
        </form>
      </div>
    </div>
  )
}