-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "department" TEXT,
    "portfolio" TEXT,
    "tenure" TEXT,
    "quote" TEXT,
    "bio" TEXT,
    "portraitUrl" TEXT,
    "portraitAlt" TEXT,
    "contactEmail" TEXT,
    "joinedYear" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Staff_role_order_idx" ON "Staff"("role", "order");

-- CreateIndex
CREATE INDEX "Staff_department_idx" ON "Staff"("department");
