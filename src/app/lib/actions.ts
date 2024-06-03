'use server';

import { z } from 'zod';
import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { upload } from '@vercel/blob/client';

const OptionFormSchema = z.object({
  actionCode: z.string(),
  parcelId: z.string(),
});

export async function createOption(formData: FormData) {
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

// https://strapi.io/blog/epic-next-js-14-tutorial-part-5-file-upload-using-server-actions
const EvidenceFormSchema = z.object({
  title: z.string(),
  inputDate: z.string(),
  fileUrl: z.string(),
  actCode: z.string(),
  parcelId: z.string()
});

export async function createEvidence(formData: FormData) {
  const { title, inputDate, fileUrl, actCode, parcelId } = EvidenceFormSchema.parse({
    title: formData.get('title'),
    inputDate: formData.get('date'),
    fileUrl: formData.get('fileUrl'),
    actCode: formData.get('actCode'),
    parcelId: formData.get('parcelId')
  });
  let date = new Date(inputDate);

  await prisma.evidence.create({
    data: {
      title, date, fileUrl, actCode, parcelId
    }
  });
  revalidatePath('/options/option');
  const params = new URLSearchParams();
  params.set('actCode', actCode);
  params.set('parcelId', parcelId);
  redirect(`/options/option?${params.toString()}`);
}

export async function deleteEvidence(id: string) {
  await prisma.evidence.delete({
    where: {
      id
    }
  });
  revalidatePath('/options/option');
}
