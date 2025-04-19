/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `business` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "business" ADD COLUMN     "uuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "business_uuid_key" ON "business"("uuid");
