import prisma from "./prisma";
import type { Action, LandParcel, Option, Evidence } from "@prisma/client";

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
            name: true
          }
        },
        parcel: {
          select: {
            name: true
          }
        }
      }
    });
    const formatted = options.map(option => ({
      actionName: option.action.name,
      parcelName: option.parcel.name,
      ...option
    }));
    return formatted;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch options');
  }
}