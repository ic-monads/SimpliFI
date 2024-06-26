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

export async function fetchFarmParcels(sbi: string) {
  try {
    const parcels = await prisma.landParcel.findMany({
      where: {
        sbi
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

export async function fetchFarmActionEvidence(sbi: string, actionCode: string) {
  const evidences = await prisma.evidence.findMany({
    where: {
      optionEvidences: {
        every: {
          actCode: actionCode,
          option: {
            parcel: {
              sbi
            }
          }
        },
      },
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

export async function fetchTasksForActionOnFarm(sbi: string, actionCode: string) {
  const tasks = await prisma.task.findMany({
    where: {
      actionCode,
      options: {
        every: {
          option: {
            parcel: {
              sbi
            }
          }
        }
      }
    },
    include: {
      action: true,
      options: {
        include: {
          option: {
            include: {
              parcel: true
            }
          }
        }
      }
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
      action: true,
      options: {
        include: {
          option: {
            include: {
              parcel: true
            }
          }
        }
      }
    }
  });
  return tasks;
}

export async function fetchAction(actCode: string) {
  const action = await prisma.action.findUniqueOrThrow({
    where: {
      code: actCode
    }
  });
  return action;
}

export async function fetchActionParcelsOnFarm(sbi: string, actionCode: string) {
  const parcels = await prisma.landParcel.findMany({
    where: {
      sbi,
      options: {
        some: {
          actionCode: actionCode
        }
      }
    }
  });

  return parcels;
}