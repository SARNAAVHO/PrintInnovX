/*
  Warnings:

  - Added the required column `amount` to the `PrintJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "JobStatus" ADD VALUE 'PAID';

-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'INR',
ADD COLUMN     "razorpayOrderId" TEXT,
ADD COLUMN     "razorpayPaymentId" TEXT;
