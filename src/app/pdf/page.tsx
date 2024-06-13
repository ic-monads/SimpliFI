"use client";

import { upload } from "@vercel/blob/client";
import { useRef } from "react";
import Submit from "../components/Submit";
import { parseAgreement } from "../server-actions/pdf";

function PDFForm() {

  // const status = useFormStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      parseAgreement(file.name);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-semibold text-2xl mb-3">Agreement</h1>
      <form className="w-full sm:w-3/4 xl:w-1/2" action={handleSubmit}>
        <div className="label">
          <label htmlFor="file" className="label-text">File</label>
        </div>
        <input className="file-input file-input-bordered w-full" type="file" ref={fileInputRef} id="file" required />
        <Submit text="Submit Evidence" />
      </form >
    </div >
  )
}

export default function Page() {
  return (<PDFForm />)
}