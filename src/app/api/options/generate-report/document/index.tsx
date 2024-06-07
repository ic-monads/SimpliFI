import { PageTop, PageBreak, NoBreak, Tailwind } from "@fileforge/react-print";
import moment from "moment";
import * as React from "react";

export type ReportEvidence = {
  id: string;
  title: string;
  date: Date;
  notes: string;
  fileUrl: string;
  appendixPos: number | undefined;
}

export type ReportOption = {
  actionCode: string;
  parcelId: string;
  evidences: ReportEvidence[];
}

const EvidenceSection = ({ evidence } : { evidence: ReportEvidence }) => {
  return (
    <NoBreak>
      <div className="flex">
        <h2 className="font-semibold text-xl inline-block align-bottom mr-4">{evidence.title}</h2>
        <p className="inline-block align-bottom">{moment(evidence.date).format("DD/MM/YYYY")}</p>
      </div>
      
      <p>{evidence.notes}</p>
      {evidence.fileUrl.endsWith(".pdf") ?
        <p>This evidence was a document. It can be found at Appendix {evidence.appendixPos!}.</p> :
        <img className="my-3 max-w-xl max-h-xl" src={evidence.fileUrl} />
      }
    </NoBreak>
  )
}

const OptionSection = ({ option } : { option: ReportOption }) => {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Evidence for {option.actionCode} Action on Parcel {option.parcelId}</h1>
      { option.evidences.map((evidence) => (
        <EvidenceSection key={evidence.id} evidence={evidence} />
      )) }
      <PageBreak />
    </div>
  )
}

export const MyDocument = ({ options } : { options: ReportOption[] }) => {
  return (
    <Tailwind>
      <PageTop>
        <div className="mt-4 flex justify-between">
          <span className="font-semibold">SFI Report For SBI 123456789</span>
          <span>Generated on {moment().format("DD/MM/YYYY")}</span>
        </div>
      </PageTop>
      <h1 className="font-semibold text-4xl">SFI Compliance Report</h1>
      <PageBreak />
      { options.filter((option) => option.evidences.length > 0).map((option) => (
        <OptionSection key={`${option.actionCode}${option.parcelId}`} option={option} />
      )) }
      {/* <h1 className="text-4xl font-semibold">Appendix</h1> */}
    </Tailwind>
  )
}