"use client"

import { ChangeEvent, useState } from "react";
import Submit from "./Submit";
import { sbiExists } from "../server-actions/farm";
import { SBINotExistError } from "@/app/lib/errors";



export async function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      await sbiExists(formData);
    } catch (error) {
      if (error instanceof SBINotExistError) {
        setError('SBI not found');
      } else {
        setError('Failed to submit form');
      }
    }
  }

  return (
    <div className="w-full flex justify-center">
      <h1>Login</h1>
      <div className="mx-auto mt-10">
        {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
        <form className="max-w-sm" action={handleSubmit}>
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