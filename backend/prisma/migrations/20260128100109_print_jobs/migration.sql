-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('CREATED', 'PRINTING', 'PRINTED', 'FAILED');

-- CreateTable
CREATE TABLE "PrintJob" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,
    "color" BOOLEAN NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'CREATED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrintJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
