/*
  Warnings:

  - You are about to drop the column `order` on the `carouselitem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `carouselitem` DROP COLUMN `order`,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0;
