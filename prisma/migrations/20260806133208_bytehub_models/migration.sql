/*
  Warnings:

  - The values [SHORTLISTED,WITHDRAWN] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `coverLetter` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `byteScore` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `graduationYear` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `DeveloperProfile` table. All the data in the column will be lost.
  - You are about to drop the column `developerId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `liveUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `technologies` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `visibility` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Conversation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[developerId,projectId]` on the table `Application` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "public"."Application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Application" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "public"."ApplicationStatus_old";
ALTER TABLE "Application" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_developerId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_developerId_fkey";

-- DropIndex
DROP INDEX "Application_jobId_developerId_key";

-- DropIndex
DROP INDEX "DeveloperProfile_username_key";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "coverLetter",
DROP COLUMN "jobId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "companyName",
DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "industry",
DROP COLUMN "logo",
DROP COLUMN "updatedAt",
DROP COLUMN "verified",
ADD COLUMN     "company" TEXT;

-- AlterTable
ALTER TABLE "DeveloperProfile" DROP COLUMN "avatar",
DROP COLUMN "bio",
DROP COLUMN "byteScore",
DROP COLUMN "createdAt",
DROP COLUMN "fullName",
DROP COLUMN "graduationYear",
DROP COLUMN "updatedAt",
DROP COLUMN "username",
ADD COLUMN     "graduation" INTEGER,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "developerId",
DROP COLUMN "featured",
DROP COLUMN "githubUrl",
DROP COLUMN "liveUrl",
DROP COLUMN "technologies",
DROP COLUMN "visibility",
ADD COLUMN     "budget" DOUBLE PRECISION,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'OPEN';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'DEVELOPER';

-- DropTable
DROP TABLE "Conversation";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "Message";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Review";

-- DropEnum
DROP TYPE "JobStatus";

-- DropEnum
DROP TYPE "MessageType";

-- DropEnum
DROP TYPE "ProjectVisibility";

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "developerId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_developerId_projectId_key" ON "Application"("developerId", "projectId");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "DeveloperProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
