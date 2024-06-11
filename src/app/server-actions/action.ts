'use server';

import prisma from "../lib/prisma";
import type { LandParcel, Task } from "@prisma/client";

export async function fetchAllActionsWithParcels() {
  try {
    const actions = await prisma.action.findMany({
      include: {
        options: {
          include: {
            parcel: true
          }
        }
      }
    });
    return actions;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch actions');
  }
}

export async function fetchAllParcelsWithActions() {
  try {
    const parcels = await prisma.landParcel.findMany({
      include: {
        options: {
          include: {
            action: true
          }
        }
      }
    });
    return parcels;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch parcels');
  }
}

export async function fetchAllActions() {
  try {
    const actions = await prisma.action.findMany();
    return actions;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('Failed to fetch actions');
  }
}

export async function fetchEvidencesForActionWithTaskAndParcels(actionCode: string) {
  const evidences = await prisma.evidence.findMany({
    where: {
      optionEvidences: {
        every: {
          actCode: actionCode
        }
      }
    },
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
  })

  return evidences;
}

export async function fetchEvidencesForParcelWithTaskAndAction(parcelId: string) {
  const evidences = await prisma.evidence.findMany({
    where: {
      optionEvidences: {
        every: {
          parcelId: parcelId
        }
      }
    },
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
  });
  return evidences;
}

export async function fetchTasksForAction(actionCode: string) {
  const tasks = await prisma.task.findMany({
    where: {
      actionCode
    },
    include: {
      action: true
    }
  });
  return tasks;
}

export async function fetchTasksForParcel(parcelId: string) {
  const tasks = await prisma.task.findMany({
    where: {
      options: {
        some: {
          parcelId
        }
      }
    },
    include: {
      action: true
    }
  });
  return tasks;
}

export async function fetchParcelsForAction(actionCode: string): Promise<LandParcel[]> {
  try {
    const parcels = await prisma.option.findMany({
      where: {
        actionCode: actionCode
      },
      include: {
        parcel: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return parcels.map((p) => p.parcel);
  } catch (e) {
    throw new Error('failed to fetch tasks for action')
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

export async function fetchActionParcels(actionCode: string) {
  const parcels = await prisma.landParcel.findMany({
    where: {
      options: {
        some: {
          actionCode: actionCode
        }
      }
    }
  });

  return parcels;
}