/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `carouselitem` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `carouselitem` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `carouselitem` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `carouselitem` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `CarouselItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CarouselItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carouselitem` DROP COLUMN `imageUrl`,
    DROP COLUMN `link`,
    DROP COLUMN `order`,
    DROP COLUMN `title`,
    ADD COLUMN `altText` VARCHAR(191) NULL,
    ADD COLUMN `imagePath` VARCHAR(191) NOT NULL,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
