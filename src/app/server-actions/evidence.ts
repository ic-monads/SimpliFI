'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../lib/prisma';
import { del } from '@vercel/blob';

const EvidenceFormSchema = z.object({
  title: z.string(),
  inputDate: z.string(),
  notes: z.string(),
  fileUrl: z.string(),
  actCode: z.string(),
  parcelIds: z.string(),
  taskId: z.string().nullable(),
  reqEvId: z.string().nullable(),
  fromTask: z.string()
});

export async function createEvidence(sbi: string, formData: FormData) {
  const { title, inputDate, notes, fileUrl, actCode, parcelIds, taskId, reqEvId, fromTask } = EvidenceFormSchema.parse({
    title: formData.get('title'),
    inputDate: formData.get('date'),
    notes: formData.get('notes'),
    fileUrl: formData.get('fileUrl'),
    actCode: formData.get('actCode'),
    parcelIds: formData.get('parcelIds'),
    taskId: formData.get('taskId'),
    reqEvId: formData.get('reqEvId'),
    fromTask: formData.get('fromTask')
  });
  let date = new Date(inputDate);

  const optionEvidences = parcelIds.split(",").map((parcelId) => {
    return { actCode, parcelId };
  });

  const evidence = await prisma.evidence.create({
    data: {
      title,
      date,
      notes,
      fileUrl,
      taskId,
      optionEvidences: {
        create: optionEvidences
      }
    }
  });

  if (reqEvId) {
    await prisma.requiredEvidence.update({
      where: {
        id: reqEvId
      },
      data: {
        evId: evidence.id,
      },
    })
  }
  let path = fromTask == 'true' ? `/${sbi}/tasks/${taskId}` : `/${sbi}/actions/${actCode}`
  revalidatePath(path);
  redirect(path);
}

export async function deleteEvidence(id: string) {
  const url = await prisma.evidence.findUnique({
    where: {
      id: id
    },
    select: {
      fileUrl: true,
    }
  });
  if (url != null) {
    await del(url.fileUrl);
  }
  const deleteEv = await prisma.evidence.delete({
    where: {
      id
    }
  });
  // revalidatePath(`/actions/${deleteEv.actionCode}`);
}