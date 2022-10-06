/*
  Warnings:

  - You are about to drop the column `updateat` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedat` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "updateat",
ADD COLUMN     "updatedat" TIMESTAMP(3) NOT NULL;
