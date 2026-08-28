-- F-164: News gets its own 4-state status enum (draft/review/published/
-- archived) instead of reusing the shared 3-state ContentStatus. Every
-- existing value (draft/published/archived) is a member of the new enum
-- too, so the USING cast below is lossless — no existing NewsArticle row
-- changes status as a result of this migration.

-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('draft', 'review', 'published', 'archived');

-- AlterTable
ALTER TABLE "NewsArticle" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "NewsArticle" ALTER COLUMN "status" TYPE "NewsStatus" USING ("status"::text::"NewsStatus");
ALTER TABLE "NewsArticle" ALTER COLUMN "status" SET DEFAULT 'draft';
