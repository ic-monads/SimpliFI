"use server";

import prisma from "@/app/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ParcelFeature } from "../lib/types";
import { fetchLandParcels } from "./rpa-api";

export async function fetchFarm(sbi: string) {
  const farm = await prisma.farm.findUniqueOrThrow({
    where: {
      sbi,
    },
  });
  return farm;
}

const CreateFarmFormSchema = z.object({
  sbi: z.string(),
  name: z.string(),
  agreementStart: z.string()
});

export async function createFarm(formData: FormData) {
  const { sbi, name, agreementStart } = CreateFarmFormSchema.parse({
    sbi: formData.get('sbi'),
    name: formData.get('name'),
    agreementStart: formData.get('agreementStart')
  })
  await prisma.farm.create({
    data: {
      sbi, name, agreementStart
    }
  });
  redirect(`/${sbi}/setup`);
}

const FarmLoginSchema = z.object({
  sbi: z.string()
})

export async function attemptLogin(formData: FormData) {
  const { sbi } = FarmLoginSchema.parse({
    sbi: formData.get("sbi")
  });
  const farm = await prisma.farm.findUnique({
    where: {
      sbi
    }
  });
  if (farm) {
    // Farm exists, can sign in 
    redirect(`/${sbi}/actions`);
  } 
  // If farm does not exist, leave on sign in

}

export async function fetchFarmFeatures(sbi: string) {
  const parcels: ParcelFeature[] = await fetchLandParcels(sbi).then((data: any) => data.features);
  return parcels;
}

export async function createFarmParcels(sbi: string, parcels: { id: string, name: string, feature: ParcelFeature }[]) {
  console.log(parcels);
  
  await prisma.farm.update({
    where: {
      sbi: sbi,
    },
    data: {
      parcels: {
        create: parcels,
      },
    },
  });

  redirect(`/${sbi}/parcels`);
}