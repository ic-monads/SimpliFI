import type { Prisma } from "@prisma/client";

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

export type ActionWithParcels = Prisma.ActionGetPayload<{
  include: { 
    options: {
      include: {
        parcel: true
      }
    }
  }
}>