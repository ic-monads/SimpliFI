'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import prisma from "../lib/prisma";

export async function fetchLandParcels() {
  try {
    const parcels = await prisma.landParcel.findMany();
    return parcels;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch land parcels');
  }
}

const ParcelFormSchema = z.object({
  id: z.string(),
  name: z.string()
});

export async function createParcel(formData: FormData) {
  const { id, name } = 
  ParcelFormSchema.parse({
      id: formData.get('id'),
      name: formData.get('name')
    });

  await prisma.landParcel.create({
    data: {
      id: id,
      name: name,
    }
  });

  revalidatePath('/parcels');
  redirect('/parcels');
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