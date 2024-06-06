import Form
 from "@/app/ui/evidence/create-evidence-form";
import { fetchParcelsForAction } from "@/app/lib/data";

export default async function Page({
    searchParams,
  }: {
    searchParams: {
      actCode: string;
      taskId?: string;
      reqEvId?: string
      evTitle?: string;
      taskName?: string;
      fromTask: string
    };
  }) {
    const parcels = await fetchParcelsForAction(searchParams.actCode);
    return (
        <main>
            <Form 
              actCode={searchParams.actCode} 
              parcels={parcels}
              taskId={searchParams.taskId} 
              reqEvId={searchParams.reqEvId} 
              evTitle={searchParams.evTitle} 
              taskName={searchParams.taskName}
              fromTask={searchParams.fromTask}
            />
        </main>
    )
  }