"use client";

import React from "react";
import ParcelForm from "./ParcelForm";
import { createFarmParcels } from "@/app/server-actions/farm";
import { ParcelFeature } from "@/app/lib/types";
import ParcelMap from "@/app/components/ParcelMap";
import { Prisma } from "@prisma/client";

export default function ParcelsSetup({ sbi, features, options }: { sbi: string, features: ParcelFeature[], options: { actionCode: string, parcelNumber: string  }[] }) {

  const [parcels, setParcels] = React.useState<{ id: string, name: string, feature: ParcelFeature, options: Prisma.OptionUncheckedCreateWithoutParcelInput[] }[]>(
    features.map((feature) => {
      const parcelId = feature.properties.SHEET_ID + feature.properties.PARCEL_ID;
      const parcelOptions = options.filter((option) => option.parcelNumber === parcelId).map((option) => ({ actionCode: option.actionCode }));
      return { id: parcelId, name: "", feature, options: parcelOptions }
    })
  );

  const [parcelIndex, setParcelIndex] = React.useState(0);
  const [completedParcels, setCompletedParcels] = React.useState(0);

  const updateParcelName = (name: string) => {
    const updatedParcels = parcels;
    const { id, feature, options } = parcels[parcelIndex];
    updatedParcels[parcelIndex] = { id, name, feature, options };
    setParcels(updatedParcels);
  }

  const skipParcel = () => {
    if (parcelIndex + 1 === parcels.length) {
      const updatedParcels = parcels;
      updatedParcels.pop();
      createFarmParcels(sbi, updatedParcels);
    }

    setParcels((parcels) => parcels.filter((_, index) => index !== parcelIndex));
    setCompletedParcels((cp) => cp + 1);
  }

  const nextParcel = () => {
    setParcelIndex(parcelIndex + 1);
    setCompletedParcels((cp) => cp + 1);

    if (parcelIndex + 1 === parcels.length) {
      createFarmParcels(sbi, parcels);
    }
  }

  return (
    <div className="w-full my-10">
      <progress className="progress progress-primary w-full" value={completedParcels} max={features.length} />
      <div className="w-full flex-grow flex flex-row space-x-5">
        <div className="w-3/4">
          {parcelIndex < parcels.length && (<ParcelMap key={parcels[parcelIndex].id} feature={parcels[parcelIndex].feature} height={500} />)}
        </div>
        <div className="w-1/4 my-4">
          <h1 className="text-2xl font-semibold">Set up your parcels</h1>
          <ParcelForm parcel={parcels[parcelIndex]} updateParcelName={updateParcelName} nextParcel={nextParcel} skipParcel={skipParcel} lastParcel={parcelIndex === parcels.length - 1} />
        </div>
      </div>
    </div>
  );
}
