"use client"

import Submit from "@/app/components/Submit";
import { createFarm } from "@/app/server-actions/farm";
import Link from "next/link";
import { useRef, useState } from "react";
import { parseAgreement, PdfData, formatResult } from "../server-actions/pdf";

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parcelNumsAndCodes, setParcelNumsAndCodes] = useState<{ parcelNumber: string; code: string }[]>([]);

  const handleSubmit = async (formData: FormData) => {
    let agreementUrl = "https://9c0ncerxleyeoepb.public.blob.vercel-storage.com/sfi-ZWlXpxPsAepGWSGUYZkLNhHDWaMt50.pdf";
    // let fileUrl = "";
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

    formData.append('agreementUrl', agreementUrl);

    createFarm(formData);
  }


  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto mt-10">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
        <form className="" action={handleSubmit}>
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
          <div className="label">
            <label htmlFor="file" className="label-text">SFI Agreement PDF</label>
          </div>
          <input className="file-input file-input-bordered w-full" type="file" ref={fileInputRef} id="file" required />
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