"use client";

import Form from "@/app/ui/evidence/create-required-evidence-form";

export default function Page({ 
  searchParams
}: { 
  searchParams: { 
    taskId: string, 
    taskName: string 
  };
  }) {
  return (
    <main>
      <Form taskId={searchParams.taskId} taskName={searchParams.taskName} />
    </main>
  )
}