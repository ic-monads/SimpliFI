"use server";

import type { Evidence, Task } from "@prisma/client";
import Link from "next/link";
import { deleteEvidence } from '@/app/lib/actions';
import Submit from '@/app/ui/options/option/submit-error';
import Moment from "moment";
import ShowModalButton from "@/app/ui/evidence-modal-button";

interface EvidenceWithNames {
  evidence: {
    task: {
      title: string;
    } | null;
    id: string;
    date: Date;
    title: string;
    notes: string;
    fileUrl: string;
    taskId: string | null;
  };
  option: {
    parcel: {
      name: string;
    };
    actionCode: string;
    parcelId: string;
  };
}

export default async function Evidences(props: { evidences: EvidenceWithNames[] }) {
  const { evidences } = props;

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
            Land Parcel
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
        {evidences.map((ev: EvidenceWithNames) => (
          <tr key={ev.evidence.id}>
            <th scope="row">
              {ev.evidence.title}
            </th>
            <td >
              {Moment(ev.evidence.date).format("DD/MM/YYYY")}
            </td>
            <td>
              {ev.option.parcel.name}
            </td>
            <td>
              {ev.evidence.taskId ? ev.evidence.task!.title : "-"}
            </td>
            <td>
              {ev.evidence.notes}
            </td>
            <td className="flex space-x-2">
              <ShowModalButton evidenceId={ev.evidence.id} />
              <form action={deleteEvidence.bind(null, ev.evidence.id)}>
                <Submit />
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {evidences.map((ev: EvidenceWithNames) => (
      <dialog key={ev.evidence.id} id={`${ev.evidence.id}-modal`} className="modal">
      { ev.evidence.fileUrl.endsWith(".pdf") ? 
        <div className="modal-box w-11/12 max-w-5xl max-h-{64rem} h-5/6 pt-12">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <object id="evidence-modal-content" data={ev.evidence.fileUrl} className="w-full h-full" /> :
        </div>
        :
        <div className="modal-box max-w-fit pt-12 w-max-content h-max-content">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <img alt="evidence-file" id="evidence-modal-content" src={ev.evidence.fileUrl} className="max-w-[80vw] max-h-[80vh]" />
        </div>
      }
      </dialog>
    ))}
    
    </>
  );
}