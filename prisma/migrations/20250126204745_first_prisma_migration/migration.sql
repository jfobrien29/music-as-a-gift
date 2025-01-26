-- CreateTable
CREATE TABLE "Gift" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "attributes" TEXT NOT NULL,
    "genres" TEXT NOT NULL,
    "artists" TEXT NOT NULL,
    "mood" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "lyrics" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "songUrl" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);
