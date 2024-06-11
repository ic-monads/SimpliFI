"use client"

import Submit from "./Submit";
import { useFormState } from 'react-dom';
import { getSbi } from "../server-actions/farm";

export async function LoginForm() {
  const [response, submit] = useFormState(getSbi, {
    success: false,
    message: ''
  });

  return (
    <div className="w-full flex justify-center">
      <h1>Login</h1>
      <div className="mx-auto mt-10">
        {!response!.success && <p className="text-red-500 text-sm mb-5">{response!.message}</p>}
        <form className="max-w-sm" action={submit}>
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