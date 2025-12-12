/*
  Warnings:

  - Added the required column `cpf` to the `Formulario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `formulario` ADD COLUMN `cpf` VARCHAR(191) NOT NULL;
