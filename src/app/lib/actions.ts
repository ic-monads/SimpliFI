'use server';

import { z } from 'zod';
import prisma from './prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { del } from '@vercel/blob';

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
  notes: z.string(),
  fileUrl: z.string(),
  actCode: z.string(),
  parcelId: z.string(),
  taskId: z.string().nullable()
});

export async function createEvidence(formData: FormData) {
  const { title, inputDate, notes, fileUrl, actCode, parcelId, taskId } = EvidenceFormSchema.parse({
    title: formData.get('title'),
    inputDate: formData.get('date'),
    notes: formData.get('notes'),
    fileUrl: formData.get('fileUrl'),
    actCode: formData.get('actCode'),
    parcelId: formData.get('parcelId'),
    taskId: formData.get('taskId')
  });
  let date = new Date(inputDate);

  await prisma.evidence.create({
    data: {
      title, date, notes, fileUrl, actCode, parcelId, taskId
    }
  });
  revalidatePath('/options/option');
  const params = new URLSearchParams();
  params.set('actCode', actCode);
  params.set('parcelId', parcelId);
  redirect(`/options/option?${params.toString()}`);
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
  await prisma.evidence.delete({
    where: {
      id
    }
  });
  revalidatePath('/options/option');
}

export async function updateTaskCompleted(id: string, completed: boolean) {
  const updatedTask = await prisma.task.update({ where: { id : id }, data: { completed: completed }});
  revalidatePath('/tasks/task');
  return updatedTask;
}

const TaskFormSchema = z.object({
  title: z.string(),
  deadline: z.string(),
  description: z.string(),
  actCode: z.string(),
  parcelId: z.string(),
});

export async function createTask(formData: FormData) {
  const { title, deadline, description, actCode, parcelId } = 
    TaskFormSchema.parse({
      title: formData.get('title'),
      deadline: formData.get('deadline'),
      description: formData.get('description'),
      actCode: formData.get('actCode'),
      parcelId: formData.get('parcelId'),
    });

  await prisma.task.create({
    data: {
      title: title,
      deadline: new Date(deadline),
      description: description,
      actCode: actCode,
      parcelId: parcelId,
    }
  });

  revalidatePath('/tasks');
  redirect('/tasks');
}

export async function getActionParcels(actionCode: string) {
  const parcels = await prisma.landParcel.findMany({
    where: {
      options: {
        some: {
          actionCode: actionCode
        }
      }
    }
  });

  return parcels;
}