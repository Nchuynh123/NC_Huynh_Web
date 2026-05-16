import { Prisma } from '@prisma/client';
import type { SocialLinks } from '@band/shared';

export function parseSocialLinks(value: Prisma.JsonValue | null): SocialLinks | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as SocialLinks;
}

export function stringifySocialLinks(links: SocialLinks | null | undefined): Prisma.InputJsonValue | typeof Prisma.DbNull {
  if (!links) return Prisma.DbNull;
  const cleaned = Object.fromEntries(
    Object.entries(links).filter(([, v]) => v && String(v).trim() !== '')
  );
  return Object.keys(cleaned).length ? cleaned : Prisma.DbNull;
}

export function serializeSettings(row: {
  id: string;
  bandName: string;
  tagline: string | null;
  about: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  socialLinks: Prisma.JsonValue | null;
  updatedAt: Date;
}) {
  return {
    ...row,
    socialLinks: parseSocialLinks(row.socialLinks),
    updatedAt: row.updatedAt.toISOString(),
  };
}
