import { LandParcel, Prisma } from "@prisma/client";
import { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import centroid from "@turf/centroid";

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; 
export const prismaJsonToFeature = (json: Prisma.JsonValue) => json as unknown as Feature
export const centerOfFeature = (feat: Feature | FeatureCollection) => centroid(feat).geometry.coordinates as [number, number]

// Modification of LandParcel
export interface ParcelFeature {
  id: string,
  name: string,
  sbi: string,
  feature: Feature<Geometry, GeoJsonProperties>
  center: [number, number]
}

export function makeParcelFeature(p: LandParcel) {
  return {
    id: p.id,
    name: p.name,
    sbi: p.sbi,
    feature: prismaJsonToFeature(p.feature),
    center: centerOfFeature(prismaJsonToFeature(p.feature))
  }
}