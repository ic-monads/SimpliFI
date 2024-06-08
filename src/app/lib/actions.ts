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

export async function createOption(actCode: string, formData: FormData) {
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
  const path = `/actions/${actionCode}`;
  revalidatePath(path);
  redirect(path);
}

// https://strapi.io/blog/epic-next-js-14-tutorial-part-5-file-upload-using-server-actions
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

export async function createEvidence(formData: FormData) {
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
  let path = fromTask == 'true' ? `/tasks/${taskId}` : `/actions/${actCode}`
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

export async function deleteRequiredEvidence(id: string, taskId: string) {
  await prisma.requiredEvidence.delete({
    where:{
      id
    }
  });
  revalidatePath(`/tasks/${taskId}`)
}

export async function updateTaskCompleted(id: string, completed: boolean) {
  const updatedTask = await prisma.task.update({ where: { id : id }, data: { completed: completed }});
  revalidatePath(`/tasks/${id}`);
  revalidatePath("/tasks");
  revalidatePath("/options/option");
  return updatedTask;
}

const TaskFormSchema = z.object({
  title: z.string(),
  deadline: z.string(),
  description: z.string(),
  actCode: z.string(),
  parcelIds: z.string(),
});

export async function createTask(formData: FormData) {
  const { title, deadline, description, actCode, parcelIds } = 
    TaskFormSchema.parse({
      title: formData.get('title'),
      deadline: formData.get('deadline'),
      description: formData.get('description'),
      actCode: formData.get('actCode'),
      parcelIds: formData.get('parcelIds'),
    });
  
  // Split list of parcelIds and map to optionTask attributes
  const optionTasks = parcelIds.split(",").map((parcelId) => {
    return { actionCode: actCode, parcelId };
  });

  await prisma.task.create({
    data: {
      title: title,
      deadline: new Date(deadline),
      description: description,
      actionCode: actCode,
      options: {
        create: optionTasks
      }
    }
  });

  revalidatePath('/tasks');
  redirect('/tasks');
}

const RequiredEvidenceFormSchema = z.object({
  title: z.string(),
  desc: z.string(),
  taskId: z.string()
});

export async function createRequiredEvidence(formData: FormData) {
  const { title, desc, taskId } = 
    RequiredEvidenceFormSchema.parse({
      title: formData.get('title'),
      desc: formData.get('desc'),
      taskId: formData.get('taskId')
    });
  await prisma.requiredEvidence.create({
    data: { title, desc, taskId }
  })
  revalidatePath(`/tasks/${taskId}`)
  redirect(`/tasks/${taskId}`)
}