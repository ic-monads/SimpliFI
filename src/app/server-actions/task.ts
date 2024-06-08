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

export async function fetchAllTasks() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        action: true
      }
    });
    return tasks;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch tasks');
  }
}

export async function fetchTask(id: string) {
  try {
    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: id
      },
      include: {
        evidences: {
          include: {
            task: true,
            optionEvidences: {
              include: {
                option: {
                  include: {
                    parcel: true
                  }
                }
              }
            } 
          }
        },
        requiredEvidences: true,
        options: {
          include: {
            option: {
              include: {
                parcel: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        action: true
      }
    });
    return task;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch task');
  }
}

export async function fetchTaskParcels(taskId: string) {
  const parcels = await prisma.landParcel.findMany({
    where: {
      options: {
        some: {
          tasks: {
            some: {
              taskId
            }
          }
        }
      }
    }
  });

  return parcels;
}