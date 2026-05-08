-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "venue" VARCHAR(200) NOT NULL,
    "category" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "tags" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationAddress" TEXT NOT NULL,
    "locationCity" TEXT NOT NULL,
    "locationState" TEXT NOT NULL,
    "locationZipCode" TEXT NOT NULL,
    "organizerName" TEXT NOT NULL,
    "organizerEmail" TEXT NOT NULL,
    "organizerPhone" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketClass" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,
    "sold" INTEGER NOT NULL DEFAULT 0,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "TicketClass_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Event_startDate_isActive_idx" ON "Event"("startDate", "isActive");

-- CreateIndex
CREATE INDEX "Event_category_isActive_idx" ON "Event"("category", "isActive");

-- CreateIndex
CREATE INDEX "Event_locationCity_locationState_idx" ON "Event"("locationCity", "locationState");

-- CreateIndex
CREATE INDEX "TicketClass_eventId_idx" ON "TicketClass"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "TicketClass_eventId_name_key" ON "TicketClass"("eventId", "name");

-- AddForeignKey
ALTER TABLE "TicketClass" ADD CONSTRAINT "TicketClass_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
