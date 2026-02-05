/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `PrintJob` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `PrintJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrintJob" DROP COLUMN "fileUrl",
ADD COLUMN     "fileId" TEXT NOT NULL;
