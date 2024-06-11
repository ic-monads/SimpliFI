'use server';

import prisma from "@/app/lib/prisma";
import type { LandParcel } from "@prisma/client";

export async function fetchFarmActionsWithParcels(sbi: string) {
  try {
    const actions = await prisma.action.findMany({
      where: {
        options: {
          some: {
            parcel: {
              sbi
            }
          }
        }
      },
      include: {
        options: {
          where: {
            parcel: {
              sbi
            }
          },
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

export async function fetchFarmParcelsWithActions(sbi: string) {
  try {
    const parcels = await prisma.landParcel.findMany({
      where: {
        sbi
      },
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

export async function fetchFarmActions(sbi: string) {
  try {
    const actions = await prisma.action.findMany({
      where: {
        options: {
          some: {
            parcel: {
              sbi
            }
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
  const parcels = await prisma.landParcel.findMany({
    where: {
      options: {
        some: {
          actionCode
        }
      }
    }
  });

  return parcels;
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