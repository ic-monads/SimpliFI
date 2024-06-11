"use server";

import prisma from "@/app/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { SBINotExistError } from "@/app/lib/errors";

const FarmSignupFormSchema = z.object({
  sbi: z.string(),
  name: z.string(),
});

const FarmLoginFormSchema = z.object({
  sbi: z.string(),
});

export async function createFarm(formData: FormData) {
  const { sbi, name } = FarmSignupFormSchema.parse({
    sbi: formData.get("sbi"),
    name: formData.get("name"),
  });
  await prisma.farm.create({
    data: {
      sbi: sbi,
      name: name,
    },
  });
  redirect(`/${sbi}/parcels`);
}

export async function sbiExists(formData: FormData) {
  const { sbi } = FarmLoginFormSchema.parse({
    sbi: formData.get("sbi"),
  });
  await prisma.farm
    .findUnique({
      where: {
        sbi,
      },
    })
    .then((result) => {
      if (!result) {
        throw new SBINotExistError();
      } else {
        redirect(`/${sbi}/parcels`);
      }
    });
}
