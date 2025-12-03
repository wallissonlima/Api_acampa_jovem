/*
  Warnings:

  - You are about to drop the column `cidade` on the `formulario` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `formulario` table. All the data in the column will be lost.
  - You are about to drop the column `mensagem` on the `formulario` table. All the data in the column will be lost.
  - You are about to drop the column `tipoCredencial` on the `formulario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `formulario` DROP COLUMN `cidade`,
    DROP COLUMN `estado`,
    DROP COLUMN `mensagem`,
    DROP COLUMN `tipoCredencial`,
    ADD COLUMN `alergiaRestricao` VARCHAR(191) NULL,
    ADD COLUMN `autorizacaoImagem` VARCHAR(191) NULL,
    ADD COLUMN `descricao` LONGTEXT NULL,
    ADD COLUMN `nomeResponsavel` VARCHAR(191) NULL,
    ADD COLUMN `tamanhoCamiseta` VARCHAR(191) NULL,
    ADD COLUMN `telefoneResponsavel` VARCHAR(191) NULL;
