"use client";

import React from "react";
import ParcelForm from "./ParcelForm";
import { createFarmParcels } from "@/app/server-actions/farm";

export default function ParcelsSetup({ sbi, parcelIds }: { sbi: string, parcelIds: string[] }) {
  const [parcels, setParcels] = React.useState<{ id: string, name: string }[]>(parcelIds.map((id) => ({ id, name: "" })));
  const [parcelIndex, setParcelIndex] = React.useState(0);

  const updateParcel = (parcel: { id: string, name: string }) => {
    const updatedParcels = parcels;
    updatedParcels[parcelIndex] = parcel;
    setParcels(updatedParcels);
  }

  const nextParcel = () => {
    setParcelIndex(parcelIndex + 1);

    if (parcelIndex + 1 === parcels.length) {
      createFarmParcels(sbi, parcels);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2 my-10">
        <h1 className="text-2xl font-semibold">Setup your parcels</h1>
        <ParcelForm parcel={parcels[parcelIndex]} updateParcel={updateParcel} nextParcel={nextParcel} />
      </div>
    </div>
  );
}