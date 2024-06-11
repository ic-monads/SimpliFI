'use server';

import { z } from 'zod';
import prisma from '../lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const OptionFormSchema = z.object({
  actionCode: z.string(),
  parcelId: z.string(),
});

export async function createOptionForAction(sbi: string, actCode: string, formData: FormData) {
  const { actionCode, parcelId } = OptionFormSchema.parse({
    actionCode: actCode,
    parcelId: formData.get('parcelId'),
  });
  await prisma.option.create({
    data: {
      actionCode: actionCode,
      parcelId: parcelId,
    }
  });
  const path = `/${sbi}/actions/${actionCode}`;
  revalidatePath(path);
  redirect(path);
}

export async function createOptionsForParcel(sbi: string, parcId: string, formData: FormData) {
  console.log(formData);
  const { actionCode, parcelId } = OptionFormSchema.parse({
    actionCode: formData.get('actionCode'),
    parcelId: parcId,
  });
  const options = actionCode.split(",").map((a) => {
    return {
      actionCode: a,
      parcelId
    }
  });

  await prisma.option.createMany({
    data: options
  });
  // await prisma.option.create({
  //   data: {
  //     actionCode: actionCode,
  //     parcelId: parcelId,
  //   }
  // });
  const path = `/${sbi}/parcels/${parcelId}`;
  revalidatePath(path);
  redirect(path);
}

export async function fetchFarmOptions(sbi: string) {
  const options = await prisma.option.findMany({
    where: {
      parcel: {
        sbi
      }
    }
  });
  return options;
}

