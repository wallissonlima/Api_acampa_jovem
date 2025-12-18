-- CreateTable
CREATE TABLE `LimiteInscricao` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `limiteParticipantes` INTEGER NULL,
    `limiteServos` INTEGER NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
