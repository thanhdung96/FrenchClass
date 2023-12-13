/*
  Warnings:

  - You are about to drop the `attendancedtail` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `attendancedtail` DROP FOREIGN KEY `AttendanceDtail_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `attendancedtail` DROP FOREIGN KEY `AttendanceDtail_studentId_fkey`;

-- DropIndex
DROP INDEX `User_phoneNumber_key` ON `user`;

-- DropTable
DROP TABLE `attendancedtail`;

-- CreateTable
CREATE TABLE `AttendanceDetail` (
    `id` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `sessionId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `AttendanceDetail_sessionId_studentId_key`(`sessionId`, `studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `AttendanceDetail` ADD CONSTRAINT `AttendanceDetail_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttendanceDetail` ADD CONSTRAINT `AttendanceDetail_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
