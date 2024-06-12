import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Link from "next/link";
import { fetchTask } from '@/app/server-actions/task';
import Evidences from '@/app/components/Evidences';
import RequiredEvidences from './RequiredEvidences';
import { CompleteButton } from './CompleteButton';
import { StatusBadge } from '@/app/components/tasks/StatusBadge';
import Moment from "moment";
import TaskParcels from '@/app/components/tasks/TaskParcels';

export default async function Page({ params }: { params: { sbi: string, id: string } }) {
  const { sbi, id } = params;
  const task = await fetchTask(id);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="font-semibold text-2xl mr-3">{task.title}</h1>
          <StatusBadge task={task} />
        </div>
        <CompleteButton sbi={sbi} task={task} />
      </div>

      <table className="text-xs border-separate border-spacing-2">
        <tbody>
          <tr>
            <td className="text-gray-500">Action</td>
            <td>{task.actionCode}: {task.action.name}</td>
          </tr>
          <tr>
            <td className="text-gray-500">Due date</td>
            <td>{Moment(task.deadline).format("DD/MM/YYYY")}</td>
          </tr>
          <tr>
            <td className="text-gray-500">Land parcels</td>
            <td><TaskParcels taskId={task.id} /></td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mt-6">Description</h2>
      <p>
        {task.description}
      </p>

      <div className="my-9">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Required Evidence</h2>
          <Link href={{
            pathname: `/${sbi}/tasks/${id}/required-evidence/add`,
            query: { taskName: task.title }
          }}>
              <button className="btn">Add Required Evidence</button>
          </Link>
        </div>
        <div className="border rounded-xl mt-3">
          <RequiredEvidences sbi={sbi} task={task} required={task.requiredEvidences} />
        </div>
      </div>

      <div className="my-9">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Evidence</h2>
          <Link href={{
            pathname: `/${sbi}/evidence/add`,
            query: { actCode: task.actionCode, taskId: id, taskName: task.title, fromTask: 'true' }
          }}>
              <button className="btn">Add Evidence</button>
          </Link>
        </div>
        <div className="border rounded-xl mt-3">
          <Evidences evidences={task.evidences} />
          </div>
      </div>
    </div>
  );
}
