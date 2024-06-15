import React from "react";
import ParcelsSetup from "./ParcelsSetup";
import { fetchFarmFeatures, fetchFarmOptionsFromAgreement } from "@/app/server-actions/farm";

export default async function Page({ params }: { params: { sbi: string } }) {
  const { sbi } = params;
  const features = await fetchFarmFeatures(sbi);
  const options = await fetchFarmOptionsFromAgreement(sbi);

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4 my-10">
        <ParcelsSetup features={features} sbi={sbi} options={options} />
      </div>
    </div>
  );
}