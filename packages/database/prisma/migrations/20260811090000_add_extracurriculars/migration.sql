-- CreateTable
CREATE TABLE "ExtracurricularActivity" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "studentQuote" TEXT,
    "season" TEXT,
    "coachStaffId" TEXT,
    "photoUrl" TEXT,
    "photoAlt" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtracurricularActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExtracurricularAchievement" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "level" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "awardedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExtracurricularAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ExtracurricularActivity_locale_category_idx" ON "ExtracurricularActivity"("locale", "category");

-- CreateIndex
CREATE INDEX "ExtracurricularActivity_locale_isActive_idx" ON "ExtracurricularActivity"("locale", "isActive");

-- CreateIndex
CREATE INDEX "ExtracurricularActivity_coachStaffId_idx" ON "ExtracurricularActivity"("coachStaffId");

-- CreateIndex
CREATE INDEX "ExtracurricularAchievement_activityId_date_idx" ON "ExtracurricularAchievement"("activityId", "date");

-- AddForeignKey
ALTER TABLE "ExtracurricularActivity" ADD CONSTRAINT "ExtracurricularActivity_coachStaffId_fkey" FOREIGN KEY ("coachStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExtracurricularAchievement" ADD CONSTRAINT "ExtracurricularAchievement_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "ExtracurricularActivity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
