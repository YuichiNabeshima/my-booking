/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomerKind" AS ENUM ('SINGLE', 'GROUP');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('CONFIRMED', 'CANCELLED', 'COMPLETED');

-- DropTable
DROP TABLE "client";

-- CreateTable
CREATE TABLE "business" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "support_single" BOOLEAN NOT NULL DEFAULT true,
    "support_group" BOOLEAN NOT NULL DEFAULT true,
    "capacity_of_group" INTEGER NOT NULL DEFAULT 4,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "start" VARCHAR(10) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "business_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "number_of_guests" INTEGER NOT NULL,
    "customer_kind" "CustomerKind" NOT NULL DEFAULT 'SINGLE',
    "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking_capacity" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "customer_kind" "CustomerKind" NOT NULL,
    "time_0_1" INTEGER NOT NULL DEFAULT 0,
    "time_1_2" INTEGER NOT NULL DEFAULT 0,
    "time_2_3" INTEGER NOT NULL DEFAULT 0,
    "time_3_4" INTEGER NOT NULL DEFAULT 0,
    "time_4_5" INTEGER NOT NULL DEFAULT 0,
    "time_5_6" INTEGER NOT NULL DEFAULT 0,
    "time_6_7" INTEGER NOT NULL DEFAULT 0,
    "time_7_8" INTEGER NOT NULL DEFAULT 0,
    "time_8_9" INTEGER NOT NULL DEFAULT 0,
    "time_9_10" INTEGER NOT NULL DEFAULT 0,
    "time_10_11" INTEGER NOT NULL DEFAULT 0,
    "time_11_12" INTEGER NOT NULL DEFAULT 2,
    "time_12_13" INTEGER NOT NULL DEFAULT 2,
    "time_13_14" INTEGER NOT NULL DEFAULT 2,
    "time_14_15" INTEGER NOT NULL DEFAULT 2,
    "time_15_16" INTEGER NOT NULL DEFAULT 0,
    "time_16_17" INTEGER NOT NULL DEFAULT 0,
    "time_17_18" INTEGER NOT NULL DEFAULT 2,
    "time_18_19" INTEGER NOT NULL DEFAULT 2,
    "time_19_20" INTEGER NOT NULL DEFAULT 2,
    "time_20_21" INTEGER NOT NULL DEFAULT 2,
    "time_21_22" INTEGER NOT NULL DEFAULT 0,
    "time_22_23" INTEGER NOT NULL DEFAULT 0,
    "time_23_24" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "time_duration" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mail_que" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mail_que_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mail_log" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "from" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mail_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_email_key" ON "business"("email");

-- CreateIndex
CREATE UNIQUE INDEX "booking_capacity_business_id_day_customer_kind_key" ON "booking_capacity"("business_id", "day", "customer_kind");

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");
