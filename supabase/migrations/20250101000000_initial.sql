-- NC Huynh Band — schema khớp Prisma
CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" TEXT NOT NULL DEFAULT 'default',
  "bandName" TEXT NOT NULL DEFAULT 'NC Huynh Band',
  "tagline" TEXT,
  "about" TEXT,
  "logoUrl" TEXT,
  "heroImageUrl" TEXT,
  "socialLinks" JSONB,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Member" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "bio" TEXT,
  "photoUrl" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Album" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "releaseDate" TIMESTAMP(3),
  "coverUrl" TEXT,
  "description" TEXT,
  "spotifyUrl" TEXT,
  "youtubeUrl" TEXT,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Album_slug_key" ON "Album"("slug");

CREATE TABLE IF NOT EXISTS "Track" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "albumId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "duration" TEXT,
  "trackNo" INTEGER NOT NULL,
  "audioUrl" TEXT,
  CONSTRAINT "Track_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Event" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "venue" TEXT NOT NULL,
  "city" TEXT NOT NULL,
  "eventDate" TIMESTAMP(3) NOT NULL,
  "ticketUrl" TEXT,
  "isPast" BOOLEAN NOT NULL DEFAULT false,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "GalleryItem" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "type" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "thumbnail" TEXT,
  "caption" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);
