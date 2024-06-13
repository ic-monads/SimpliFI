"use client";

import { upload } from "@vercel/blob/client";
import { useRef } from "react";
import Submit from "../components/Submit";
import { parseAgreement } from "../server-actions/pdf";

function PDFForm() {

  // const status = useFormStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    let fileUrl = "https://9c0ncerxleyeoepb.public.blob.vercel-storage.com/sfi-ZWlXpxPsAepGWSGUYZkLNhHDWaMt50.pdf";
    // if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
    //   console.log("Attempting file upload");
    //   const file = fileInputRef.current.files[0];
    //   const blob = await upload(file.name, file, {
    //     access: "public",
    //     handleUploadUrl: "/api/agreement/handle-upload",
    //   });

    //   console.log("File uploaded successfully.");
    //   fileUrl = blob.url;
    // }

    const parsed = await parseAgreement(fileUrl);
    console.log(parsed);

  }

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