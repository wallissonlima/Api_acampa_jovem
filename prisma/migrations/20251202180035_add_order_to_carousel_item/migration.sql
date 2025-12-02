/*
  Warnings:

  - You are about to drop the column `altText` on the `carouselitem` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `carouselitem` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `carouselitem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `carouselitem` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `CarouselItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carouselitem` DROP COLUMN `altText`,
    DROP COLUMN `imagePath`,
    DROP COLUMN `sortOrder`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `link` VARCHAR(191) NULL,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `title` VARCHAR(191) NULL;
