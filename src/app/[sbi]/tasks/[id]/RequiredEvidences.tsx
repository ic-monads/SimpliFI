"use server";

import type { RequiredEvidence, Task } from "@prisma/client";
import Link from "next/link";
import DeleteButton from '@/app/components/DeleteButton';
import { deleteRequiredEvidence } from "@/app/server-actions/required-evidence";

export default async function RequiredEvidences(props: {sbi: string, task: Task, required: RequiredEvidence[]}) {
  const { sbi, required, task } = props;

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
                : 'Complete'}
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
