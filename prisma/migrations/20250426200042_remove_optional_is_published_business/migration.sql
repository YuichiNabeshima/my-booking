/*
  Warnings:

  - Made the column `is_published` on table `business` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "business" ALTER COLUMN "is_published" SET NOT NULL;
