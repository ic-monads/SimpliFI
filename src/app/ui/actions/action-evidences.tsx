"use server";

import type { Evidence, Task } from "@prisma/client";
import { deleteEvidence } from '@/app/lib/actions';
import Submit from '@/app/ui/options/option/submit-error';
import Moment from "moment";
import ShowModalButton from "@/app/ui/evidence-modal-button";
import { EvidenceWithTaskAndParcels } from "@/app/lib/data";
import { EvidenceParcels } from "./evidence-parcels";

export default async function Evidences(props: { evidences: EvidenceWithTaskAndParcels[] }) {
  const { evidences } = props;

  function getParcels(evidence: EvidenceWithTaskAndParcels) {
    return evidence.optionEvidences.map((optionEvidence) => optionEvidence.option.parcel);
  }

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
            Land Parcels
          </th>
          <th scope="col">
            Task
          </th>
          <th scope="col">
            Notes
          </th>
        </tr>
      </thead>
      <tbody>
        {evidences.map((evidence: EvidenceWithTaskAndParcels) => (
          <tr key={evidence.id}>
            <th scope="row">
              {evidence.title}
            </th>
            <td >
              {Moment(evidence.date).format("DD/MM/YYYY")}
            </td>
            <td>
              <EvidenceParcels parcels={getParcels(evidence)} />
            </td>
            <td>
              {evidence.task ? evidence.task.title : "-"}
            </td>
            <td>
              {evidence.notes}
            </td>
            <td className="flex space-x-2">
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
      <dialog key={evidence.id} id={`${evidence.id}-modal`} className="modal">
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
          <img alt="evidence-file" id="evidence-modal-content" src={evidence.fileUrl} className="max-w-[80vw] max-h-[80vh]" />
        </div>
      }
      </dialog>
    ))}
    
    </>
  );
}