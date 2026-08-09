-- CreateTable
CREATE TABLE "Society" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "category" TEXT NOT NULL,
    "foundingYear" TEXT,
    "description" TEXT,
    "meetingSchedule" TEXT,
    "memberCount" INTEGER,
    "howToJoin" TEXT,
    "logoUrl" TEXT,
    "logoAlt" TEXT,
    "bannerUrl" TEXT,
    "bannerAlt" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "advisorStaffId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Society_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Society_locale_slug_key" ON "Society"("locale", "slug");

-- CreateIndex
CREATE INDEX "Society_category_idx" ON "Society"("category");

-- CreateIndex
CREATE INDEX "Society_advisorStaffId_idx" ON "Society"("advisorStaffId");

-- AddForeignKey
ALTER TABLE "Society" ADD CONSTRAINT "Society_advisorStaffId_fkey" FOREIGN KEY ("advisorStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
