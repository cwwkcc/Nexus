-- F-181: "optional link to a related News article" — nullable, no backfill
-- needed since every existing row simply has none set.

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN "relatedNewsArticleId" TEXT;
