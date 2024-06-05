"use server";

import type { Evidence } from "@prisma/client";
import { deleteEvidence } from '@/app/lib/actions';
import Submit from '@/app/ui/options/option/submit-error';
import Moment from "moment";
import ShowModalButton from "./evidence-modal-button";

export default async function Evidences(props: { evidences: Evidence[] }) {
  const evidences = props.evidences;

  return(
    <>
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
              {Moment(evidence.date).format("DD/MM/YYYY")}
            </td>
            <td>
              {evidence.notes}
            </td>
            <td>
              {/* <a className="btn btn-sm btn-content-neutral" href={evidence.fileUrl} target="_blank" rel="noreferrer">
                View File
              </a> */}
              <ShowModalButton fileUrl={evidence.fileUrl} />
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
    <dialog id="evidence-modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl max-h-{64rem} h-5/6 pt-12">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <object id="evidence-modal-content" data="" className="w-full h-full" />
      </div>
    </dialog>
    </>
  );
}