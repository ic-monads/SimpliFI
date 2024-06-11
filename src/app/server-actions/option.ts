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

export async function createOptionForParcel(parcId: string, formData: FormData) {
  const { actionCode, parcelId } = OptionFormSchema.parse({
    actionCode: formData.get('actionCode'),
    parcelId: parcId,
  });
  await prisma.option.create({
    data: {
      actionCode: actionCode,
      parcelId: parcelId,
    }
  });
  const path = `/parcels/${parcelId}`;
  revalidatePath(path);
  redirect(path);
}

