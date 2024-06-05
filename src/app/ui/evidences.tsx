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
            <td className="flex space-x-2">
              {/* <a className="btn btn-sm btn-content-neutral" href={evidence.fileUrl} target="_blank" rel="noreferrer">
                View File
              </a> */}
              <ShowModalButton evidenceId={evidence.id} />
              <form action={deleteEvidence.bind(null, evidence.id)}>
                <Submit />
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {evidences.map((evidence: Evidence) => (
      <dialog id={`${evidence.id}-modal`} className="modal">
      { evidence.fileUrl.endsWith(".pdf") ? 
        <div className="modal-box w-11/12 max-w-5xl max-h-{64rem} h-5/6 pt-12">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <object id="evidence-modal-content" data={evidence.fileUrl} className="w-full h-full" /> :
        </div>
        :
        <div className="modal-box max-w-fit pt-12 w-max-content h-max-content">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <img id="evidence-modal-content" src={evidence.fileUrl} className="max-w-{80vw} max-h-{80vh}" />
        </div>
      }
      </dialog>
    ))}
    
    </>
  );
}