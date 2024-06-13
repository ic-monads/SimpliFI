"use server";

import prisma from "@/app/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ParcelFeature } from "../lib/types";
import { fetchLandParcels } from "./rpa-api";
import { Prisma } from "@prisma/client";
import { parseAgreement, PdfData, formatResult } from "./pdf";

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
  agreementStart: z.string(),
  agreementUrl: z.string(),
});

export async function createFarm(formData: FormData) {
  const { sbi, name, agreementStart, agreementUrl } = CreateFarmFormSchema.parse({
    sbi: formData.get("sbi"),
    name: formData.get("name"),
    agreementStart: formData.get("agreementStart"),
    agreementUrl: formData.get("agreementUrl"),
  });
  await prisma.farm.create({
    data: {
      sbi,
      name,
      agreementStart: new Date(agreementStart),
      agreementUrl
    },
  });
  redirect(`/${sbi}/setup`);
}

export async function fetchFarmOptions(sbi: string) {
  const { agreementUrl } = await prisma.farm.findUniqueOrThrow({ where: { sbi }, select: { agreementUrl: true } });
  const parsedString =  await parseAgreement(agreementUrl);
  const dataJson = JSON.parse(parsedString) as PdfData;
  const formattedData = await formatResult(dataJson);
  return formattedData;
}

const FarmLoginSchema = z.object({
  sbi: z.string(),
});

export async function attemptLogin(formData: FormData) {
  const { sbi } = FarmLoginSchema.parse({
    sbi: formData.get("sbi"),
  });
  const farm = await prisma.farm.findUnique({
    where: {
      sbi,
    },
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

export async function createFarmParcels(sbi: string, parcels: { id: string; name: string; feature: ParcelFeature }[]) {
  const jsonParcels = parcels.map((p) => {
    return {
      id: p.id,
      name: p.name,
      feature: p.feature as unknown as Prisma.JsonObject,
    };
  });

  await prisma.farm.update({
    where: {
      sbi: sbi,
    },
    data: {
      parcels: {
        create: jsonParcels,
      },
    },
  });

  redirect(`/${sbi}/parcels`);
}
