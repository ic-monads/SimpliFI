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
  console.log('Page', searchParams);
  return (
    <main>
      <Form taskId={searchParams.taskId} taskName={searchParams.taskName} />
    </main>
  )
}