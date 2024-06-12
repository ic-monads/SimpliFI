import React from "react";
import ParcelsSetup from "./ParcelsSetup";
import { fetchFarmParcelIds } from "@/app/server-actions/farm";

export default async function Page({ params }: { params: { sbi: string } }) {
  const { sbi } = params;
  const parcelIds = await fetchFarmParcelIds(sbi);

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2 my-10">
        <ParcelsSetup parcelIds={parcelIds} sbi={sbi} />
      </div>
    </div>
  );
}