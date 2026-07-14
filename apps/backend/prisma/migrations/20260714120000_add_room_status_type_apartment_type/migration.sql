-- AlterEnum
ALTER TYPE "RoomType" ADD VALUE 'THREE_BEDROOM';

-- AlterEnum
ALTER TYPE "RoomStatus" ADD VALUE 'ABOUT_TO_VACATE';

-- CreateEnum
CREATE TYPE "ApartmentType" AS ENUM ('APARTMENT', 'SERVICED_APARTMENT');

-- AlterTable
ALTER TABLE "apartments" ADD COLUMN "apartmentType" "ApartmentType" NOT NULL DEFAULT 'APARTMENT';
