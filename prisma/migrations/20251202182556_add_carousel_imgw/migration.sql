/*
  Warnings:

  - You are about to drop the column `imagePath` on the `carouselitem` table. All the data in the column will be lost.
  - Added the required column `image` to the `CarouselItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carouselitem` DROP COLUMN `imagePath`,
    ADD COLUMN `image` LONGBLOB NOT NULL,
    ADD COLUMN `mimeType` VARCHAR(191) NULL;
