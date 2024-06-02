'use server';

import { z } from 'zod';
import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const OptionFormSchema = z.object({
  actionCode: z.string(),
  parcelId: z.string(),
})

export async function createOption(formData: FormData) {
  console.log(formData);
  const { actionCode, parcelId } = OptionFormSchema.parse({
    actionCode: formData.get('actionCode'),
    parcelId: formData.get('parcelId'),
  });
  await prisma.option.create({
    data: {
      actionCode: actionCode,
      parcelId: parcelId,
    }
  });
  revalidatePath('/options');
  redirect('/options');
}