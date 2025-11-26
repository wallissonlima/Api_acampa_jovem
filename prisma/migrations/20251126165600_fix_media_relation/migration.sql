/*
  Warnings:

  - You are about to drop the column `local` on the `evento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `evento` DROP COLUMN `local`;

-- AlterTable
ALTER TABLE `media` ADD COLUMN `eventoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
