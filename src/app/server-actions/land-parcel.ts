'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from "../lib/prisma";

export async function fetchFarmLandParcelsMissingForAction(sbi: string, actionCode: string) {
  try {
    const parcels = await prisma.landParcel.findMany({
      where: {
        sbi,
        options: {
          none: {
            actionCode
          }
        }
      }
    });
    return parcels;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch land parcels');
  }
}

const ParcelFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  sbi: z.string(),
  actions: z.string()
});

export async function createParcel(formData: FormData) {
  const { id, name, sbi, actions } = 
  ParcelFormSchema.parse({
      id: formData.get('id'),
      name: formData.get('name'),
      sbi: formData.get('sbi'),
      actions: formData.get('actions')
    });

  await prisma.landParcel.create({
    data: { 
      id, 
      name, 
      sbi,
      options: {
        create: actions.split(',').map((actionCode: string) => { return { actionCode } })
      }
    }
  });

  const path = `/${sbi}/parcels`
  revalidatePath(path);
  redirect(path);
}

export async function fetchParcelName(parcelId: string) {
  try {
    const name = await prisma.landParcel.findUniqueOrThrow({
      where: {
        id: parcelId
      },
      select: {
        name: true
      }
    });
    return name.name;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch parcel name');
  }
}

export async function fetchActionsForParcel(parcelId: string) {
  const actions = await prisma.action.findMany({
    where: {
      options: {
        some: {
          parcelId
        }
      }
    }
  });

  return actions;
}

export async function fetchActionsMissingForParcel(parcelId: string) {
  const actions = await prisma.action.findMany({
    where: {
      options: {
        none: {
          parcelId
        }
      }
    }
  });
  return actions;
}