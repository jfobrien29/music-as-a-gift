/*
  Warnings:

  - You are about to drop the column `artist` on the `Gift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gift" DROP COLUMN "artist",
ADD COLUMN     "musicDetails" TEXT;
