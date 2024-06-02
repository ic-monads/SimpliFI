-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'FOREMAN', 'AGENT');

-- CreateTable
CREATE TABLE "Evidence" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "actionCode" TEXT NOT NULL,
    "landParcelId" TEXT NOT NULL,

    CONSTRAINT "Evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandParcel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rpaId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,

    CONSTRAINT "LandParcel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Option" (
    "actionCode" TEXT NOT NULL,
    "landParcelId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("actionCode","landParcelId")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFarmRole" (
    "userId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "UserFarmRole_pkey" PRIMARY KEY ("userId","farmId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Action_code_key" ON "Action"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Evidence" ADD CONSTRAINT "Evidence_actionCode_landParcelId_fkey" FOREIGN KEY ("actionCode", "landParcelId") REFERENCES "Option"("actionCode", "landParcelId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandParcel" ADD CONSTRAINT "LandParcel_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_actionCode_fkey" FOREIGN KEY ("actionCode") REFERENCES "Action"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_landParcelId_fkey" FOREIGN KEY ("landParcelId") REFERENCES "LandParcel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFarmRole" ADD CONSTRAINT "UserFarmRole_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFarmRole" ADD CONSTRAINT "UserFarmRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
