/*
  Warnings:

  - The `status` column on the `ContentEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SiteSetting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[contentEntryId,version]` on the table `ContentEntryVersion` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `locale` on the `ContentEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `locale` on the `SiteSetting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'si', 'ta');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published', 'archived');

-- DropIndex
DROP INDEX "ContentEntryVersion_contentEntryId_version_idx";

-- AlterTable
ALTER TABLE "ContentEntry" DROP COLUMN "locale",
ADD COLUMN     "locale" "Locale" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "SiteSetting" DROP CONSTRAINT "SiteSetting_pkey",
DROP COLUMN "locale",
ADD COLUMN     "locale" "Locale" NOT NULL,
ADD CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key", "locale");

-- CreateIndex
CREATE INDEX "ContentEntry_scope_locale_idx" ON "ContentEntry"("scope", "locale");

-- CreateIndex
CREATE INDEX "ContentEntry_status_idx" ON "ContentEntry"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ContentEntry_scope_sectionKey_locale_key" ON "ContentEntry"("scope", "sectionKey", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "ContentEntryVersion_contentEntryId_version_key" ON "ContentEntryVersion"("contentEntryId", "version");
