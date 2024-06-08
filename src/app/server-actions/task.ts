'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../lib/prisma';

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

export async function updateTaskCompleted(id: string, completed: boolean) {
  const updatedTask = await prisma.task.update({ where: { id : id }, data: { completed: completed }});
  revalidatePath(`/tasks/${id}`);
  revalidatePath("/tasks");
  revalidatePath("/options/option");
  return updatedTask;
}