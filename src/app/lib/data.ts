"use server";

import prisma from "./prisma";
import type { LandParcel } from "@prisma/client";
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

// TODO: Filter by selected parcels
export async function fetchEvidenceForAction(actionCode: string) {
  try {
    const evidence = await prisma.evidence.findMany({
      where: {
        optionEvidences: {
          some: { // or every? depends if evidence can be for different actions
            actCode: actionCode,
          }
        }
      }
    })
    return evidence;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch evidence for action');
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

export async function fetchAllTasks() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        action: true
      }
    });
    return tasks;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch tasks');
  }
}

export async function fetchTaskEvidenceInfo(id: string) {
  try {
    const task = await prisma.task.findUniqueOrThrow({
      where: {
        id: id
      },
      include: {
        evidences: true,
        requiredEvidences: true,
        options: {
          include: {
            option: {
              include: {
                parcel: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        action: true
      }
    });
    return task;
  } catch (e) {
    console.error('Database Error:', e);
    throw new Error('failed to fetch task');
  }
}

export async function fetchOption(actionCode: string, parcelId: string) {
  const evidence = await prisma.option.findUniqueOrThrow({
    where: {
      actionCode_parcelId: {
        actionCode,
        parcelId
      }
    },
    include: {
      evidences: true,
      tasks: {
        include: {
          task: {
            include: {
              action: true
            }
          }
        }
      }
    }
  });
  return evidence;
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

export async function fetchTaskParcels(taskId: string) {
  const parcels = await prisma.landParcel.findMany({
    where: {
      options: {
        some: {
          tasks: {
            some: {
              taskId
            }
          }
        }
      }
    }
  });

  return parcels;
}

export async function getActionParcels(actionCode: string) {
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