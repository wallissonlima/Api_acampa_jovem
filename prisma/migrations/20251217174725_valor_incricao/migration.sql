/*
  Warnings:

  - You are about to drop the `configuracao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `configuracao`;

-- CreateTable
CREATE TABLE `valorIncricao` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
