import { PageTop, PageBreak, NoBreak, Tailwind } from "@fileforge/react-print";
import * as React from "react";

export type ReportEvidence = {
  title: string;
  notes: string;
  fileUrl: string;
}

export type ReportOption = {
  actionCode: string;
  parcelId: string;
  evidences: ReportEvidence[];
}

const EvidenceSection = ({ evidence } : { evidence: ReportEvidence }) => {
  return (
    <NoBreak>
      <h2 className="font-semibold">{evidence.title}</h2>
      <p>{evidence.notes}</p>
      {evidence.fileUrl.endsWith(".pdf") ? <p>PDF</p> : <img className="max-w-2xl max-h-xl" src={evidence.fileUrl} />}
    </NoBreak>
  )
}

const OptionSection = ({ option } : { option: ReportOption }) => {
  return (
    <div>
      <h1 className="font-semibold text-xl">{option.actionCode} - {option.parcelId}</h1>
      { option.evidences.map((evidence) => (
        <EvidenceSection evidence={evidence} />
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
      { options.filter((option) => option.evidences.length > 0).map((option) => (
        <OptionSection option={option} />
      )) }
    </Tailwind>
  )
}