/*
  Warnings:

  - You are about to drop the column `actionCode` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `landParcelId` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Evidence` table. All the data in the column will be lost.
  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Farm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LandParcel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFarmRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evidence" DROP CONSTRAINT "Evidence_actionCode_landParcelId_fkey";

-- DropForeignKey
ALTER TABLE "LandParcel" DROP CONSTRAINT "LandParcel_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_actionCode_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_landParcelId_fkey";

-- DropForeignKey
ALTER TABLE "UserFarmRole" DROP CONSTRAINT "UserFarmRole_farmId_fkey";

-- DropForeignKey
ALTER TABLE "UserFarmRole" DROP CONSTRAINT "UserFarmRole_userId_fkey";

-- AlterTable
ALTER TABLE "Evidence" DROP COLUMN "actionCode",
DROP COLUMN "landParcelId",
DROP COLUMN "notes",
DROP COLUMN "url",
ADD COLUMN     "fileUrl" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "Farm";

-- DropTable
DROP TABLE "LandParcel";

-- DropTable
DROP TABLE "Option";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserFarmRole";

-- DropEnum
DROP TYPE "Role";
