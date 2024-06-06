import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTaskEvidenceInfo, fetchParcelName, fetchActionName } from '@/app/lib/data';
import Evidences from '@/app/ui/tasks/task/task-evidences';
import RequiredEvidences from '@/app/ui/evidence/required-evidences';
import { CompleteButton } from '@/app/ui/tasks/task/complete-button';
import { StatusBadge } from '@/app/ui/tasks/task/status-badge';
import Moment from "moment";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const task = await fetchTaskEvidenceInfo(id);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        {/* <Link href="/tasks">
          <ArrowLeftIcon className="size-6 ml-auto"/>
        </Link> */}
        <div>
          <h2>{task.actCode}: {task.option.action.name}</h2>
          <div className="flex items-center">
            <h1 className="font-semibold text-2xl mr-3">{task.title}</h1>
            <StatusBadge task={task} />
          </div>
        </div>
        <CompleteButton task={task} />
      </div>

      <p className="mb-3">Due on {Moment(task.deadline).format("DD/MM/YYYY")}</p>

      <div className="badge badge-outline">{task.parcelId}: {task.option.parcel.name}</div>

      <h2 className="text-lg font-semibold mt-6">Description</h2>
      <p>
        {task.description}
      </p>
      
      <div className="my-5">
        <h2 className="text-xl font-semibold">Required Evidence</h2>
        <RequiredEvidences task={task} required={task.requiredEvidences} />
      </div>
      <Link href={{
        pathname: "/evidence/add-required", 
        query: { taskId: id, taskName: task.title }
      }}>
          <button className="btn btn-primary">Add Required Evidence</button>
      </Link>
      <div className="my-6">
        <h2 className="text-lg font-semibold">Evidence</h2>
        <Evidences evidences={task.evidences} parcelName={task.option.parcel.name} />
      </div>
      <Link href={{
        pathname: "/evidence/add", 
        query: { actCode: task.actCode, parcelId: task.parcelId, taskId: id, taskName: task.title, fromTask: 'true' }
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}

