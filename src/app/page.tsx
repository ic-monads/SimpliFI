"use client";

import { redirect } from "next/navigation";
import Submit from "./components/Submit";

export default function Home() {
  const handleSubmit = async (formData: FormData) => {
    redirect(`${formData.get('sbi')}/actions`);
  }

  return(
    <div className="w-full flex justify-center">
      <div className="mx-auto mt-10">
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
