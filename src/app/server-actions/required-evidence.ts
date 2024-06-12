'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../lib/prisma';

const RequiredEvidenceFormSchema = z.object({
  title: z.string(),
  desc: z.string(),
  taskId: z.string()
});

export async function createRequiredEvidence(sbi: string, formData: FormData) {
  const { title, desc, taskId } = 
    RequiredEvidenceFormSchema.parse({
      title: formData.get('title'),
      desc: formData.get('desc'),
      taskId: formData.get('taskId')
    });
  await prisma.requiredEvidence.create({
    data: { title, desc, taskId }
  })
  revalidatePath(`/${sbi}/tasks/${taskId}`)
  redirect(`/${sbi}/tasks/${taskId}`)
}

export async function deleteRequiredEvidence(id: string, taskId: string) {
  await prisma.requiredEvidence.delete({
    where:{
      id
    }
  });
  revalidatePath(`/tasks/${taskId}`)
}