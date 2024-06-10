import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTask } from '@/app/server-actions/task';
import Evidences from '@/app/components/Evidences';
import RequiredEvidences from '@/app/[sbi]/tasks/[id]/RequiredEvidences';
import { CompleteButton } from '@/app/[sbi]/tasks/[id]/CompleteButton';
import { StatusBadge } from '@/app/components/tasks/StatusBadge';
import Moment from "moment";
import TaskParcels from '@/app/components/tasks/TaskParcels';

export default async function Page({ params }: { params: { sbi: string, id: string } }) {
  const { sbi, id } = params;
  const task = await fetchTask(id);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2>{task.actionCode}: {task.action.name}</h2>
          <div className="flex items-center">
            <h1 className="font-semibold text-2xl mr-3">{task.title}</h1>
            <StatusBadge task={task} />
          </div>
        </div>
        <CompleteButton sbi={sbi} task={task} />
      </div>

      <p className="mb-3">Due on {Moment(task.deadline).format("DD/MM/YYYY")}</p>

      <TaskParcels taskId={task.id} />

      <h2 className="text-lg font-semibold mt-6">Description</h2>
      <p>
        {task.description}
      </p>

      <div className="my-5">
        <h2 className="text-xl font-semibold">Required Evidence</h2>
        <RequiredEvidences task={task} required={task.requiredEvidences} />
      </div>
      <Link href={{
        pathname: "/required-evidence/add",
        query: { taskId: id, taskName: task.title }
      }}>
          <button className="btn btn-primary">Add Required Evidence</button>
      </Link>
      <div className="my-6">
        <h2 className="text-lg font-semibold">Evidence</h2>
        <Evidences evidences={task.evidences} />
      </div>
      <Link href={{
        pathname: `/${sbi}/evidence/add`,
        query: { actCode: task.actionCode, taskId: id, taskName: task.title, fromTask: 'true' }
      }}>
          <button className="btn btn-primary">Add Evidence</button>
      </Link>
    </div>
  );
}
