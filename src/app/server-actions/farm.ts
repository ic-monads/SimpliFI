"use server";

import { Farm } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

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
  redirect(`/${sbi}/parcels`);
}

export type validateAndUseInputType = {
  success: boolean;
  message: string;
};

export async function getSbi(prevState: validateAndUseInputType | null, formData: FormData) {
  const sbi = FarmFormSchema.safeParse({ sbi: formData.get("sbi") }).data?.sbi;
  let success = false;
  try {
    const result = await prisma.farm.findUnique({
      where: {
        sbi: sbi,
      },
    });
    if (result) {
      success = true;
    }
    // return { success: success, message: "" };
  } catch (error) {
    console.error(error);
    // throw error;
    return { success: false, message: "Failed to submit form" };
  } finally {
    if (success) {
      redirect(`/${sbi}/parcels`);
    }
  }
}
