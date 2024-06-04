"use server";

import type { Evidence } from "@prisma/client";
import { deleteEvidence } from '@/app/lib/actions';
import Submit from '@/app/ui/options/option/submit-error';

export default async function Evidences(props: { evidences: Evidence[] }) {
  const evidences = props.evidences;

  return(
    <table className="table">
      <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Date
          </th>
          <th scope="col">
            Notes
          </th>
          <th scope="col">
            File
          </th>
          <th scope="col">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {evidences.map((evidence: Evidence) => (
          <tr key={evidence.id}>
            <th scope="row">
              {evidence.title}
            </th>
            <td >
              {new Date(evidence.date).toLocaleDateString()}
            </td>
            <td>
              {evidence.notes}
            </td>
            <td>
              <a className="btn btn-sm btn-content-neutral" href={evidence.fileUrl} target="_blank" rel="noreferrer">
                View File
              </a>
            </td>
            <td>
              <form action={deleteEvidence.bind(null, evidence.id)}>
                <Submit />
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}