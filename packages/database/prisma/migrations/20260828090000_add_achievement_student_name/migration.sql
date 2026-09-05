-- F-156/F-181: the Achievement Database was missing a student-name field
-- entirely, despite it being a required filterable/CRUD field in both
-- specs. Added as NOT NULL with a temporary empty-string default so any
-- existing rows don't block the migration, then the default is dropped so
-- future inserts must supply a real value — existing rows would need a
-- manual backfill through the admin edit form, there's no name to derive
-- one from automatically.

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN "studentName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Achievement" ALTER COLUMN "studentName" DROP DEFAULT;
