/*
  Warnings:

  - You are about to drop the column `fileId` on the `PrintJob` table. All the data in the column will be lost.
  - Added the required column `files` to the `PrintJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrintJob" DROP COLUMN "fileId",
ADD COLUMN     "files" JSONB NOT NULL;
