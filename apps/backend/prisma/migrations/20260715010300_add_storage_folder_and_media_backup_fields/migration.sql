-- CreateEnum
CREATE TYPE "BackupStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "StorageProvider" AS ENUM ('CLOUDINARY', 'DRIVE');

-- CreateEnum
CREATE TYPE "StorageFolderLevel" AS ENUM ('ROOT', 'CATEGORY', 'DISTRICT', 'APARTMENT', 'ROOM');

-- AlterTable
ALTER TABLE "media" ADD COLUMN "cloudinaryFolder" TEXT,
ADD COLUMN "sizeBytes" INTEGER,
ADD COLUMN "driveFileId" TEXT,
ADD COLUMN "driveFolderId" TEXT,
ADD COLUMN "driveUrl" TEXT,
ADD COLUMN "backupStatus" "BackupStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "isCover" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "media_backupStatus_idx" ON "media"("backupStatus");

-- CreateIndex
CREATE INDEX "media_driveFolderId_idx" ON "media"("driveFolderId");

-- CreateIndex
CREATE INDEX "media_cloudinaryFolder_idx" ON "media"("cloudinaryFolder");

-- CreateTable
CREATE TABLE "storage_folders" (
    "id" TEXT NOT NULL,
    "provider" "StorageProvider" NOT NULL,
    "level" "StorageFolderLevel" NOT NULL,
    "entityId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "folderName" TEXT NOT NULL,
    "parentFolderId" TEXT,
    "path" TEXT NOT NULL,
    "isOld" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "storage_folders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "storage_folders_provider_level_entityId_idx" ON "storage_folders"("provider", "level", "entityId");

-- CreateIndex
CREATE INDEX "storage_folders_isOld_idx" ON "storage_folders"("isOld");

-- CreateIndex
CREATE INDEX "storage_folders_path_idx" ON "storage_folders"("path");
