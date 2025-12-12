/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Formulario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Formulario_cpf_key` ON `Formulario`(`cpf`);
