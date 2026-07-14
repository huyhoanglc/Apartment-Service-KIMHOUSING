-- DropTable
DROP TABLE "storage_folders";

-- DropIndex
DROP INDEX "media_backupStatus_idx";

-- DropIndex
DROP INDEX "media_driveFolderId_idx";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "backupStatus",
DROP COLUMN "driveFileId",
DROP COLUMN "driveFolderId",
DROP COLUMN "driveUrl";

-- DropEnum
DROP TYPE "BackupStatus";

-- DropEnum
DROP TYPE "StorageProvider";

-- DropEnum
DROP TYPE "StorageFolderLevel";
