"use client";

import { useFormStatus } from "react-dom";

export default function Submit() {
  const status = useFormStatus();

  return(
    <button className={`btn btn-sm text-white ${status.pending ? "btn-disabled" : "btn-error"}`} type="submit">Delete</button>
  )
}