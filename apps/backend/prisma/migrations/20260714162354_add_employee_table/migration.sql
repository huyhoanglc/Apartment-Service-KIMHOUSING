-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "fullName" TEXT,
    "email" TEXT,
    "dateOfBirth" DATE,
    "phone" TEXT,
    "position" TEXT,
    "startDate" DATE,
    "managerName" TEXT,
    "employmentType" TEXT,
    "bankAccountNumber" TEXT,
    "bankName" TEXT,
    "salaryInfo" TEXT,
    "employmentStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_employeeCode_key" ON "employees"("employeeCode");

-- CreateIndex
CREATE INDEX "employees_email_idx" ON "employees"("email");

-- CreateIndex
CREATE INDEX "employees_phone_idx" ON "employees"("phone");
