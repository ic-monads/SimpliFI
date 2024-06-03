"use client"; // This is a client-side component

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";

import Form
 from "@/app/ui/options/option/create-evidence-form";

export default function Page({
    searchParams,
  }: {
    searchParams: {
      actCode: string;
      parcelId: string;
    };
  }) {
    return (
        <main>
            <Form actCode={searchParams.actCode} parcelId={searchParams.parcelId} />
        </main>
    )
  }