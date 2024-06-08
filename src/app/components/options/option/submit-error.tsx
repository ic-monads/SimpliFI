"use client";

import { useFormStatus } from "react-dom";
import { TrashIcon } from "@heroicons/react/24/outline"

export default function Submit() {
  const status = useFormStatus();

  return(
    <button className={`btn btn-sm btn-square text-white ${status.pending ? "btn-disabled" : "btn-error"}`} type="submit"><TrashIcon className="w-5" /></button>
  )
}