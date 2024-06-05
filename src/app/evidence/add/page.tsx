"use client"; // This is a client-side component

import Form
 from "@/app/ui/options/option/create-evidence-form";

export default function Page({
    searchParams,
  }: {
    searchParams: {
      actCode: string;
      parcelId: string;
      taskId?: string;
      reqEvId?: string
      evTitle?: string;
    };
  }) {
    return (
        <main>
            <Form actCode={searchParams.actCode} parcelId={searchParams.parcelId} taskId={searchParams.taskId} reqEvId={searchParams.reqEvId} evTitle={searchParams.evTitle} />
        </main>
    )
  }