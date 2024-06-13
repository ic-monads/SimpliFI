import type { Prisma } from "@prisma/client";
import { BBox, Geometry } from "geojson";

export type TaskWithAction = Prisma.TaskGetPayload<{
  include: { action: true }
}>

export type EvidenceWithTaskAndParcels = Prisma.EvidenceGetPayload<{
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
}>

export type EvidenceWithTaskAndAction = Prisma.EvidenceGetPayload<{
  include: {
    task: true,
    optionEvidences: {
      include: {
        option: {
          include: {
            action: true
          }
        }
      }
    }
  }
}>

export type ActionWithParcels = Prisma.ActionGetPayload<{
  include: { 
    options: {
      include: {
        parcel: true
      }
    }
  }
}>

export type ParcelWithActions = Prisma.LandParcelGetPayload<{
  include: {
    options: {
      include: {
        action: true
      }
    }
  }
}>

export type ParcelFeature = {
  type: "Feature";
  id: string;
  // geometry: {
  //   type: string;
  //   coordinates: number[][][];
  // };
  geometry: Geometry;
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
  bbox: BBox;
};