"use server";

import type { Evidence, Task } from "@prisma/client";
import Link from "next/link";
import { deleteEvidence } from '@/app/lib/actions';
import Submit from '@/app/ui/options/option/submit-error';
import Moment from "moment";
import ShowModalButton from "@/app/ui/evidence-modal-button";

export default async function Evidences(props: { evidences: Evidence[], parcelName: string }) {
  const { evidences, parcelName } = props;

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
            Notes
          </th>
        </tr>
      </thead>
      <tbody>
        {evidences.map((ev) => (
          <tr key={ev.id}>
            <th scope="row">
              {ev.title}
            </th>
            <td >
              {Moment(ev.date).format("DD/MM/YYYY")}
            </td>
            <td>
              { parcelName }
            </td>
            <td>
              {ev.notes}
            </td>
            <td className="flex space-x-2">
              <ShowModalButton evidenceId={ev.id} />
              <form action={deleteEvidence.bind(null, ev.id)}>
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