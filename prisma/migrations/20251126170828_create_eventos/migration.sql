/*
  Warnings:

  - You are about to drop the column `eventoId` on the `formulario` table. All the data in the column will be lost.
  - You are about to drop the column `eventoId` on the `media` table. All the data in the column will be lost.
  - Made the column `dataInicio` on table `evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dataFim` on table `evento` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `formulario` DROP FOREIGN KEY `Formulario_eventoId_fkey`;

-- DropForeignKey
ALTER TABLE `media` DROP FOREIGN KEY `Media_eventoId_fkey`;

-- AlterTable
ALTER TABLE `evento` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imagem` VARCHAR(191) NULL,
    MODIFY `descricao` VARCHAR(191) NULL,
    MODIFY `dataInicio` DATETIME(3) NOT NULL,
    MODIFY `dataFim` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `formulario` DROP COLUMN `eventoId`;

-- AlterTable
ALTER TABLE `media` DROP COLUMN `eventoId`;
