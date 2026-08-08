-- CreateTable
CREATE TABLE "CalendarEntry" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "category" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CalendarEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDetail" (
    "id" TEXT NOT NULL,
    "calendarEntryId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImageUrl" TEXT,
    "coverImageAlt" TEXT,
    "location" TEXT,
    "startTime" TEXT,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "registrationUrl" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CalendarEntry_locale_date_idx" ON "CalendarEntry"("locale", "date");

-- CreateIndex
CREATE INDEX "CalendarEntry_category_idx" ON "CalendarEntry"("category");

-- CreateIndex
CREATE UNIQUE INDEX "EventDetail_calendarEntryId_key" ON "EventDetail"("calendarEntryId");

-- CreateIndex
CREATE UNIQUE INDEX "EventDetail_locale_slug_key" ON "EventDetail"("locale", "slug");

-- CreateIndex
CREATE INDEX "EventDetail_locale_status_idx" ON "EventDetail"("locale", "status");

-- AddForeignKey
ALTER TABLE "EventDetail" ADD CONSTRAINT "EventDetail_calendarEntryId_fkey" FOREIGN KEY ("calendarEntryId") REFERENCES "CalendarEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
