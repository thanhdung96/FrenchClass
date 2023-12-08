/*
  Warnings:

  - You are about to drop the `_SessionToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_SessionToStudent` DROP FOREIGN KEY `_SessionToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_SessionToStudent` DROP FOREIGN KEY `_SessionToStudent_B_fkey`;

-- DropTable
DROP TABLE `_SessionToStudent`;

-- CreateTable
CREATE TABLE `AttendanceDtail` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `sessionId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AttendanceDtail_sessionId_studentId_key`(`sessionId`, `studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AttendanceDtail` ADD CONSTRAINT `AttendanceDtail_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceDtail` ADD CONSTRAINT `AttendanceDtail_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
