import { Farm } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { z } from "zod";
import { redirect } from "next/navigation";

const FarmFormSchema = z.object({
  sbi: z.string(),
  name: z.string()
});

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