-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "variant" TEXT NOT NULL DEFAULT 'info',
    "message" TEXT NOT NULL,
    "linkLabel" TEXT,
    "linkHref" TEXT,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Announcement_locale_isActive_publishAt_idx" ON "Announcement"("locale", "isActive", "publishAt");
