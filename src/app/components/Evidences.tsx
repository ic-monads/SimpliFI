"use server";

import type { Evidence, Task } from "@prisma/client";
import { deleteEvidence } from '@/app/server-actions/evidence';
import DeleteButton from '@/app/components/DeleteButton';
import Moment from "moment";
import ShowModalButton from "@/app/components/ShowModalButton";
import { EvidenceWithTaskAndParcels } from "@/app/lib/types";
import { ParcelBadges } from "@/app/components/ParcelBadges";

export default async function Evidences({ evidences, showTasks }: { evidences: EvidenceWithTaskAndParcels[], showTasks?: boolean }) {

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

          { showTasks &&
            <th scope="col">
              Task
            </th>
          }

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
              <ParcelBadges parcels={getParcels(evidence)} />
            </td>
            { showTasks &&
              <td>
                {evidence.task ? evidence.task.title : "-"}
              </td>
            }
            <td>
              {evidence.notes}
            </td>
            <td className="flex space-x-2">
              <ShowModalButton modalId={evidence.id} />
              <form action={deleteEvidence.bind(null, evidence.id)}>
                <DeleteButton />
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
