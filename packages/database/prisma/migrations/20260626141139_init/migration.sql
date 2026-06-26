-- CreateTable
CREATE TABLE "ContentEntry" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "data" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ContentEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentEntryVersion" (
    "id" TEXT NOT NULL,
    "contentEntryId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedBy" TEXT,

    CONSTRAINT "ContentEntryVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key","locale")
);

-- CreateIndex
CREATE INDEX "ContentEntry_scope_locale_idx" ON "ContentEntry"("scope", "locale");

-- CreateIndex
CREATE INDEX "ContentEntry_status_idx" ON "ContentEntry"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ContentEntry_scope_sectionKey_locale_key" ON "ContentEntry"("scope", "sectionKey", "locale");

-- CreateIndex
CREATE INDEX "ContentEntryVersion_contentEntryId_version_idx" ON "ContentEntryVersion"("contentEntryId", "version");

-- AddForeignKey
ALTER TABLE "ContentEntryVersion" ADD CONSTRAINT "ContentEntryVersion_contentEntryId_fkey" FOREIGN KEY ("contentEntryId") REFERENCES "ContentEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
