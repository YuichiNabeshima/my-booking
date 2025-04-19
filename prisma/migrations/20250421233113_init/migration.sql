/*
  Warnings:

  - You are about to drop the column `client_id` on the `course` table. All the data in the column will be lost.
  - You are about to drop the `mail_log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mail_que` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `business_id` to the `course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Cuisine" AS ENUM ('CANADIAN', 'ITALIAN', 'ASIAN', 'SEAFOOD', 'MEXICAN', 'VEGAN');

-- CreateEnum
CREATE TYPE "Neighborhood" AS ENUM ('DOWNTOWN', 'GASTOWN', 'YALETOWN', 'WEST_END', 'KITSILANO', 'MAIN_STREET', 'CHINATOWN');

-- CreateEnum
CREATE TYPE "BusinessHoursKind" AS ENUM ('ALL_DAY', 'MORNING', 'LUNCH', 'DINNER', 'BAR');

-- AlterTable
ALTER TABLE "business" ADD COLUMN     "address" VARCHAR(255),
ADD COLUMN     "business_hours_note" TEXT,
ADD COLUMN     "cuisine_kind" "Cuisine",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "neighborhood" "Neighborhood",
ADD COLUMN     "parking" VARCHAR(255),
ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "payment_method" VARCHAR(255),
ADD COLUMN     "price_level" INTEGER,
ADD COLUMN     "tel" VARCHAR(20),
ADD COLUMN     "total_seats" INTEGER,
ADD COLUMN     "zip_code" VARCHAR(7);

-- AlterTable
ALTER TABLE "course" DROP COLUMN "client_id",
ADD COLUMN     "business_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "mail_log";

-- DropTable
DROP TABLE "mail_que";

-- CreateTable
CREATE TABLE "business_picture" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "caption" VARCHAR(255) NOT NULL,
    "is_top_slide" BOOLEAN NOT NULL DEFAULT false,
    "is_gallery" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_tag" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_queue" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_log" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_hours" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL,
    "hours_kind" "BusinessHoursKind",
    "is_open" BOOLEAN NOT NULL,
    "open_time" VARCHAR(10),
    "close_time" VARCHAR(10),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_hours_business_id_day_of_week_hours_kind_key" ON "business_hours"("business_id", "day_of_week", "hours_kind");

-- AddForeignKey
ALTER TABLE "business_picture" ADD CONSTRAINT "business_picture_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_tag" ADD CONSTRAINT "business_tag_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_hours" ADD CONSTRAINT "business_hours_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
