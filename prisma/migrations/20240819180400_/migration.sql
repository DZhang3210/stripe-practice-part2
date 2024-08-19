/*
  Warnings:

  - You are about to drop the column `hasUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasUser",
ADD COLUMN     "hasAccess" BOOLEAN DEFAULT false;
