"use client";

import type { RequiredEvidence, Task } from "@prisma/client";
import Link from "next/link";
import DeleteButton from '@/app/components/DeleteButton';
import { deleteRequiredEvidence } from "@/app/server-actions/required-evidence";
import EmptyCollection from "@/app/components/EmptyCollection";
import useSWR from "swr";

export default function RequiredEvidences(props: {sbi: string, task: Task}) {
  const { sbi, task } = props;

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data } = useSWR(`/api/${sbi}/tasks/${task.id}/required-evidence`, fetcher);
  
  if (!data) return <></>;

  const required = data.requiredEvidences;

  if (required.length === 0) return <EmptyCollection message="Add required evidence to ensure you are ready for inspections." />;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Description
          </th>
          <th scope="col">
            Status
          </th>
          <th scope="col">
          </th>
        </tr>
      </thead>
      <tbody>
        {
          required.map((req: RequiredEvidence) => (
            <tr key={req.id}>
              <th scope="row">
                {req.title}
              </th>
              <td>
                {req.desc}
              </td>
              <td>
                {req.evId == null ?
                <Link href={{
                  pathname: `/${sbi}/evidence/add`,
                  query: { actCode: task.actionCode, taskId: task.id, taskName: task.title, reqEvId: req.id, evTitle: req.title, fromTask: true }
                }}>
                    <button className="btn btn-primary btn-sm">Add Evidence</button>
                </Link>
                : <div className="flex items-center"><div className="badge badge-success badge-xs mr-1"></div>Complete</div>}
              </td>
              <td className="text-end">
                <form action={deleteRequiredEvidence.bind(null, req.id, task.id)}>
                  <DeleteButton />
                </form>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
