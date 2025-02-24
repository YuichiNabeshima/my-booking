-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "support_single" BOOLEAN NOT NULL DEFAULT true,
    "support_group" BOOLEAN NOT NULL DEFAULT true,
    "capacity_of_group" INTEGER NOT NULL DEFAULT 4,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");
