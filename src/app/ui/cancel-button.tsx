"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function CancelButton() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()}  className="btn btn-neutral-content">Cancel</button>
  )
}