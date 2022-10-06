/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UpdatePoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_belongsto_id_fkey";

-- DropForeignKey
ALTER TABLE "Update" DROP CONSTRAINT "Update_productId_fkey";

-- DropForeignKey
ALTER TABLE "UpdatePoint" DROP CONSTRAINT "UpdatePoint_updateId_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Update";

-- DropTable
DROP TABLE "UpdatePoint";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateat" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "belongsto_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "updates" (
    "id" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "UPDATE_STATUS" NOT NULL DEFAULT 'in_progress',
    "version" TEXT,
    "asset" TEXT,
    "productId" TEXT NOT NULL,

    CONSTRAINT "updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "updatepoints" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "updateId" TEXT NOT NULL,

    CONSTRAINT "updatepoints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "products_belongsto_id_key" ON "products"("belongsto_id");

-- CreateIndex
CREATE INDEX "products_id_belongsto_id_idx" ON "products"("id", "belongsto_id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_belongsto_id_fkey" FOREIGN KEY ("belongsto_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "updates" ADD CONSTRAINT "updates_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "updatepoints" ADD CONSTRAINT "updatepoints_updateId_fkey" FOREIGN KEY ("updateId") REFERENCES "updates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
