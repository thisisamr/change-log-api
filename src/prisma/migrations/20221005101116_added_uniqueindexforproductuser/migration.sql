/*
  Warnings:

  - A unique constraint covering the columns `[belongsto_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_belongsto_id_key" ON "Product"("belongsto_id");

-- CreateIndex
CREATE INDEX "Product_id_belongsto_id_idx" ON "Product"("id", "belongsto_id");
