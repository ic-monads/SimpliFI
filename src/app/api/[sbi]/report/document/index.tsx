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
  action: {
    name: string;
  };
  parcel: {
    name: string;
  };
  evidences: ReportEvidence[];
}

const EvidenceSection = ({ evidence } : { evidence: ReportEvidence }) => {
  return (
    <NoBreak>
      <div className="my-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{evidence.title}</h3>
          <p className="">{moment(evidence.date).format("DD/MM/YYYY")}</p>
        </div>
        
        <p>{evidence.notes}</p>
        {evidence.fileUrl.endsWith(".pdf") ?
          <p className="border rounded-xl p-3 text-gray-500 my-6">This evidence was a document. It can be found at Appendix {evidence.appendixPos!}.</p> :
          <div className="my-6 flex justify-center">
            <img className="max-w-xl max-h-xl" src={evidence.fileUrl} />
          </div>
        }
      </div>
    </NoBreak>
  )
}

const OptionSection = ({ option } : { option: ReportOption }) => {
  return (
    <>
      <h2 className="font-semibold text-xl mb-3"> {option.actionCode}: {option.action.name}</h2>
      <h3 className="text-lg"><span className="text-gray-500">Parcel</span> <span className="font-semibold">{option.parcelId}</span> ({option.parcel.name})</h3>
      { option.evidences.map((evidence) => <EvidenceSection key={evidence.id} evidence={evidence} />) }
      <PageBreak />
    </>
  )
}

export const SFIReport = ({ sbi, options } : { sbi: string, options: ReportOption[] }) => {
  return (
    <Tailwind>
      <head><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" /></head>
      <body style={{
        fontFamily: "Roboto, sans-serif"
      }}>
        <h1 className="font-semibold text-4xl text-center mt-32 mb-3">SFI Compliance Report</h1>
        <p className="text-center mb-3">Single Business Identifier: {sbi}</p>
        <p className="text-center font-normal">Generated on {moment().format("DD/MM/YYYY")}</p>
        <PageBreak />
        <PageTop>
          <p className="mt-6">SBI: {sbi}</p>
        </PageTop>
        { options.map((option) => <OptionSection key={`${option.actionCode}${option.parcelId}`} option={option} />) }
      </body>
    </Tailwind>
  )
}