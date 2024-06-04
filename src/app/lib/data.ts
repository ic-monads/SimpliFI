import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import type { Action, LandParcel, Option, Evidence, Task } from "@prisma/client";

export async function fetchAllActions() {
  try {
    const actions = await prisma.action.findMany();
    return actions;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch actions');
  }
}

/* TODO: Add fetchUserActions */

export async function fetchLandParcels() {
  try {
    const parcels = await prisma.landParcel.findMany();
    return parcels;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch land parcels');
  }
}

/* TODO: Add fetchUserLandParcels */

export async function fetchAllOptions() {
  try {
    const options = await prisma.option.findMany({
      include: {
        action: {
          select: {
            code: true,
            name: true
          }
        },
        parcel: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return options;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch options');
  }
}

export async function fetchAllTasks() {
  try {
    const tasks = await prisma.task.findMany();
    return tasks;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch tasks');
  }
}

export async function fetchTaskDetails(id: string) {
  try {
    const details = await prisma.task.findUniqueOrThrow({
      where: {
        id: id
      },
    });
    return details;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch task details');
  }
}

export async function fetchOptionEvidence(actCode: string, parcelId: string) {
  try {
    const evidence = await prisma.evidence.findMany(({
      where: {
        actCode: {
          equals: actCode
        },
        parcelId: {
          equals: parcelId
        }
      }
    }));
    return evidence;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch evidence');
  }
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

export async function fetchActionName(actCode: string) {
  try {
    const name = await prisma.action.findUniqueOrThrow({
      where: {
        code: actCode
      },
      select: {
        name: true
      }
    });
    return name.name;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch action name');
  }
}