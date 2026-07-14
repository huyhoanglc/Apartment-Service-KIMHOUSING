-- AlterTable
ALTER TABLE "apartments" ADD COLUMN "apartmentSeq" SERIAL;
ALTER TABLE "apartments" ADD COLUMN "apartmentCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "apartments_apartmentSeq_key" ON "apartments"("apartmentSeq");

-- Backfill existing rows so apartmentCode can be made required in a later migration
UPDATE "apartments" SET "apartmentCode" = 'A' || LPAD("apartmentSeq"::text, 6, '0');
