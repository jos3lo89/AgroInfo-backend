-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(36) NOT NULL,
    `usuario` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(40) NOT NULL,
    `apellido` VARCHAR(50) NOT NULL,
    `correo` VARCHAR(30) NOT NULL,
    `clave` VARCHAR(110) NOT NULL,
    `foto` VARCHAR(40) NOT NULL,
    `rol` VARCHAR(15) NULL DEFAULT 'publico',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
