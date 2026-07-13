/*
  Warnings:

  - You are about to drop the column `address` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `bathrooms` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `bedrooms` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `publicPrice` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `apartments` table. All the data in the column will be lost.
  - You are about to drop the column `apartmentId` on the `media` table. All the data in the column will be lost.
  - You are about to drop the `amenities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `apartment_amenities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inquiries` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accessType` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerName` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `managerPhone` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRooms` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomId` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('STAIRS', 'ELEVATOR', 'BOTH');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('DUPLEX', 'STUDIO', 'ONE_BEDROOM', 'TWO_BEDROOM');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('AVAILABLE', 'RENTED', 'HIDDEN');

-- DropForeignKey
ALTER TABLE "public"."apartment_amenities" DROP CONSTRAINT "apartment_amenities_amenityId_fkey";

-- DropForeignKey
ALTER TABLE "public"."apartment_amenities" DROP CONSTRAINT "apartment_amenities_apartmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."inquiries" DROP CONSTRAINT "inquiries_apartmentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."media" DROP CONSTRAINT "media_apartmentId_fkey";

-- DropIndex
DROP INDEX "public"."apartments_slug_key";

-- DropIndex
DROP INDEX "public"."apartments_status_idx";

-- DropIndex
DROP INDEX "public"."media_apartmentId_idx";

-- AlterTable
ALTER TABLE "apartments" DROP COLUMN "address",
DROP COLUMN "area",
DROP COLUMN "basePrice",
DROP COLUMN "bathrooms",
DROP COLUMN "bedrooms",
DROP COLUMN "description",
DROP COLUMN "publicPrice",
DROP COLUMN "slug",
DROP COLUMN "status",
DROP COLUMN "title",
ADD COLUMN     "accessType" "AccessType" NOT NULL,
ADD COLUMN     "buildingName" TEXT,
ADD COLUMN     "houseNumber" TEXT NOT NULL,
ADD COLUMN     "managerName" TEXT NOT NULL,
ADD COLUMN     "managerPhone" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "totalRooms" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "media" DROP COLUMN "apartmentId",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."amenities";

-- DropTable
DROP TABLE "public"."apartment_amenities";

-- DropTable
DROP TABLE "public"."inquiries";

-- DropEnum
DROP TYPE "public"."ApartmentStatus";

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "roomType" "RoomType" NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "basePrice" INTEGER NOT NULL,
    "publicPrice" INTEGER NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment_features" (
    "apartmentId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "apartment_features_pkey" PRIMARY KEY ("apartmentId","featureId")
);

-- CreateTable
CREATE TABLE "room_features" (
    "roomId" TEXT NOT NULL,
    "featureId" TEXT NOT NULL,

    CONSTRAINT "room_features_pkey" PRIMARY KEY ("roomId","featureId")
);

-- CreateIndex
CREATE UNIQUE INDEX "rooms_slug_key" ON "rooms"("slug");

-- CreateIndex
CREATE INDEX "rooms_status_idx" ON "rooms"("status");

-- CreateIndex
CREATE UNIQUE INDEX "features_name_key" ON "features"("name");

-- CreateIndex
CREATE INDEX "media_roomId_idx" ON "media"("roomId");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_features" ADD CONSTRAINT "apartment_features_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_features" ADD CONSTRAINT "apartment_features_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_features" ADD CONSTRAINT "room_features_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_features" ADD CONSTRAINT "room_features_featureId_fkey" FOREIGN KEY ("featureId") REFERENCES "features"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
