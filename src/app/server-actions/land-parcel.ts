"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "../lib/prisma";
import { fetchLandParcels } from "./rpa-api";

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
    console.error("Database Error:", e);
    throw new Error("Failed to fetch land parcels");
  }
}

const ParcelFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  sbi: z.string(),
  actions: z.string(),
});

export async function createParcel(formData: FormData) {
  const { id, name, sbi, actions } = ParcelFormSchema.parse({
    id: formData.get("id"),
    name: formData.get("name"),
    sbi: formData.get("sbi"),
    actions: formData.get("actions"),
  });

  await prisma.landParcel.create({
    data: {
      id,
      name,
      sbi,
      options: {
        create: actions.split(",").map((actionCode: string) => {
          return { actionCode };
        }),
      },
    },
  });

  const path = `/${sbi}/parcels`;
  revalidatePath(path);
  redirect(path);
}

export async function fetchParcelName(parcelId: string) {
  try {
    const name = await prisma.landParcel.findUniqueOrThrow({
      where: {
        id: parcelId,
      },
      select: {
        name: true,
      },
    });
    return name.name;
  } catch (e) {
    console.error("Database Error:", e);
    throw new Error("failed to fetch parcel name");
  }
}

export async function fetchActionsForParcel(parcelId: string) {
  const actions = await prisma.action.findMany({
    where: {
      options: {
        some: {
          parcelId,
        },
      },
    },
  });

  return actions;
}

type ParcelFeature = {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  geometry_name: string;
  properties: {
    index: number;
    ID: string;
    SHEET_ID: string;
    PARCEL_ID: string;
    VALID_FROM: string;
    VALID_TO: string;
    LFA_CODE: string;
    CREATED_ON: string;
    AREA_HA: number;
    SBI: string;
    SHAPE_AREA: number;
    SHAPE_PERIMETER: number;
  };
  bbox: number[];
};

export async function initialiseParcelsFromSBI(sbi: string) {
  const parcels: ParcelFeature[] = await fetchLandParcels(sbi).then((data: any) => data.features);
  parcels.forEach(async (parcel: ParcelFeature) => {
    const currParcel = await prisma.landParcel.findUnique({ where: { id: parcel.id } });
    if (currParcel === null) {
      await prisma.landParcel.create({
        data: {
          id: parcel.properties.SHEET_ID + " " + parcel.properties.PARCEL_ID,
          name: parcel.properties.SHEET_ID + " " + parcel.properties.PARCEL_ID,
          sbi: sbi,
        },
      });
    }
  });
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
