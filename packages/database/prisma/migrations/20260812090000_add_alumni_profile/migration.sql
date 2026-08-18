-- CreateEnum
CREATE TYPE "AlumniStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "AlumniProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "graduationYear" TEXT NOT NULL,
    "stream" TEXT,
    "currentRole" TEXT,
    "currentOrg" TEXT,
    "portraitUrl" TEXT,
    "portraitAlt" TEXT,
    "quote" TEXT,
    "isFeatureworthy" BOOLEAN NOT NULL DEFAULT false,
    "status" "AlumniStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlumniProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlumniProfile_status_idx" ON "AlumniProfile"("status");

-- CreateIndex
CREATE INDEX "AlumniProfile_graduationYear_idx" ON "AlumniProfile"("graduationYear");
