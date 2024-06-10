"use client";

import React, { useRef } from 'react';

export default function GenerateReport() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const generateReport = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    buttonRef.current!.disabled = true;
    let res = await fetch("/api/options/generate-report");
    const blob = new Blob([await res.blob()], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    a.click();
    buttonRef.current!.disabled = false;
  };

  return (
    <button type="submit" ref={buttonRef} onClick={generateReport} className="btn btn-primary">Generate Report</button>
  )
}