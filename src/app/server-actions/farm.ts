"use server";

import prisma from "@/app/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ParcelFeature } from "../lib/types";
import { fetchLandParcels } from "./rpa-api";

const FarmFormSchema = z.object({
  sbi: z.string(),
  name: z.string(),
});

export async function fetchFarm(formData: FormData) {
  "use server";
  const { sbi, name } = FarmFormSchema.parse({
    sbi: formData.get("sbi"),
    name: formData.get("name"),
  });

  const farm = await prisma.farm.findUnique({
    where: {
      sbi,
    },
  });
  if (farm === null) {
    await prisma.farm.create({
      data: {
        sbi: sbi,
        name: name,
      },
    });
  }
}

export async function createFarm(formData: FormData) {
  'use server';
  const { sbi, name } = FarmFormSchema.parse({
    sbi: formData.get('sbi'),
    name: formData.get('name')
  })
  await prisma.farm.create({
    data: {
      sbi: sbi,
      name: name
    }
  });
  redirect(`/${sbi}/setup`);
}

// export type validateAndUseInputType = {
//   success: boolean;
//   message: string;
// };

// export async function getSbi(prevState: validateAndUseInputType | null, formData: FormData) {
//   const sbi = FarmFormSchema.safeParse({ sbi: formData.get("sbi") }).data?.sbi;
//   let success = false;
//   try {
//     const result = await prisma.farm.findUnique({
//       where: {
//         sbi: sbi,
//       },
//     });
//     if (result) {
//       success = true;
//     }
//     // return { success: success, message: "" };
//   } catch (error) {
//     console.error(error);
//     // throw error;
//     return { success: false, message: "Failed to submit form" };
//   } finally {
//     if (success) {
//       redirect(`/${sbi}/parcels`);
//     }
//   }
// }

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