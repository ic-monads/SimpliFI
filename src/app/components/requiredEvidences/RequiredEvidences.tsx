"use server";

import type { RequiredEvidence, Task } from "@prisma/client";
import Link from "next/link";
import DeleteButton from '@/app/components/DeleteButton';
import { deleteRequiredEvidence } from "@/app/lib/actions";

export default async function RequiredEvidences(props: {task: Task, required: RequiredEvidence[]}) {
  const required = props.required;
  const task = props.task;

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
                  pathname: "/evidence/add",
                  query: { actCode: task.actionCode, taskId: task.id, reqEvId: req.id, evTitle: req.title, fromTask: true }
                }}>
                    <button className="btn btn-primary">Add Evidence</button>
                </Link>
                : 'Complete'}
              </td>
              <td>
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
