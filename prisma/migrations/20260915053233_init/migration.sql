/*
  Warnings:

  - You are about to alter the column `shortCode` on the `Url` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - A unique constraint covering the columns `[originalUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "shortCode" SET DATA TYPE VARCHAR(10);

-- CreateIndex
CREATE UNIQUE INDEX "Url_originalUrl_key" ON "Url"("originalUrl");

-- CreateIndex
CREATE INDEX "Url_createdAt_idx" ON "Url"("createdAt");
