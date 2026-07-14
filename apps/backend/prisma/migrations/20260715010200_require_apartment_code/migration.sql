-- AlterTable
ALTER TABLE "apartments" ALTER COLUMN "apartmentCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "apartments_apartmentCode_key" ON "apartments"("apartmentCode");
