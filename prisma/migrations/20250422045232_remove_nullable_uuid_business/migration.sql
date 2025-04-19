/*
  Warnings:

  - Made the column `uuid` on table `business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "business" ALTER COLUMN "uuid" SET NOT NULL;
