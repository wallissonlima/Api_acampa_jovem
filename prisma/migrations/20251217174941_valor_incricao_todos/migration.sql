/*
  Warnings:

  - You are about to drop the `valorincricao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `valorincricao`;

-- CreateTable
CREATE TABLE `ValorInscricao` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `priceParticipante` DOUBLE NOT NULL,
    `priceServo` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
