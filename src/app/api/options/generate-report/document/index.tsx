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
    <NoBreak className="space-y-4">
      <div className="flex flex-row space-x-6">
        <h2 className="font-semibold text-xl">{evidence.title}</h2>
        <p>{moment(evidence.date).format("DD/MM/YYYY")}</p>
      </div>
      <p>{evidence.notes}</p>
      {evidence.fileUrl.endsWith(".pdf") ? <p>This evidence was a document. It can be found at Appendix {evidence.appendixPos!}.</p> : <img className="max-w-2xl max-h-xl" src={evidence.fileUrl} />}
    </NoBreak>
  )
}

const OptionSection = ({ option } : { option: ReportOption }) => {
  return (
    <div>
      <h1 className="font-semibold text-2xl">{option.actionCode} - {option.parcelId}</h1>
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
        <span className="font-semibold">SFI Report</span>
      </PageTop>
      <h1 className="font-semibold text-4xl">SFI Compliance Report</h1>
      <PageBreak />
      { options.filter((option) => option.evidences.length > 0).map((option) => (
        <OptionSection key={`${option.actionCode}${option.parcelId}`} option={option} />
      )) }
      <h1 className="text-4xl font-semibold">Appendix</h1>
    </Tailwind>
  )
}