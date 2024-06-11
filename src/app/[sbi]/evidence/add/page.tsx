import EvidenceForm from "@/app/[sbi]/evidence/EvidenceForm";
import { fetchActionParcelsOnFarm } from "@/app/server-actions/action";

export default async function Page({
    params, searchParams
  }: {
    params: {
      sbi: string;
    };
    searchParams: {
      actCode: string;
      taskId?: string;
      reqEvId?: string
      evTitle?: string;
      taskName?: string;
      fromTask: string
    }
  }) {
    const { sbi } = params;
    const { actCode, taskId, reqEvId, evTitle, taskName, fromTask } = searchParams;
    const parcels = await fetchActionParcelsOnFarm(sbi, actCode);
    return (
        <main>
            <EvidenceForm
              sbi={sbi}
              actCode={actCode}
              parcels={parcels}
              taskId={taskId}
              reqEvId={reqEvId}
              evTitle={evTitle}
              taskName={taskName}
              fromTask={fromTask}
            />
        </main>
    )
  }
