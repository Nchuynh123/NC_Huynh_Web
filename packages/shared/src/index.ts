import { z } from 'zod';

export const AlbumTypeEnum = z.enum(['ALBUM', 'EP', 'SINGLE']);
export const GalleryTypeEnum = z.enum(['IMAGE', 'VIDEO']);

export type AlbumType = z.infer<typeof AlbumTypeEnum>;
export type GalleryType = z.infer<typeof GalleryTypeEnum>;

export interface SocialLinks {
  spotify?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export interface SiteSettings {
  id: string;
  bandName: string;
  tagline: string | null;
  about: string | null;
  logoUrl: string | null;
  heroImageUrl: string | null;
  socialLinks: SocialLinks | null;
  updatedAt: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Track {
  id: string;
  albumId: string;
  title: string;
  duration: string | null;
  trackNo: number;
  audioUrl: string | null;
}

export interface Album {
  id: string;
  title: string;
  slug: string;
  type: AlbumType;
  releaseDate: string | null;
  coverUrl: string | null;
  description: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  isPublished: boolean;
  sortOrder: number;
  tracks?: Track[];
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  city: string;
  eventDate: string;
  imageUrl: string | null;
  ticketUrl: string | null;
  isPast: boolean;
  isPublished: boolean;
}

export interface GalleryItem {
  id: string;
  type: GalleryType;
  url: string;
  thumbnail: string | null;
  caption: string | null;
  sortOrder: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const socialLinksSchema = z.object({
  spotify: z.string().url().optional().or(z.literal('')),
  youtube: z.string().url().optional().or(z.literal('')),
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  tiktok: z.string().url().optional().or(z.literal('')),
});

export const siteSettingsSchema = z.object({
  bandName: z.string().min(1, 'Tên band là bắt buộc'),
  tagline: z.string().optional().nullable(),
  about: z.string().optional().nullable(),
  logoUrl: z.string().optional().nullable(),
  heroImageUrl: z.string().optional().nullable(),
  socialLinks: socialLinksSchema.optional().nullable(),
});

export const memberSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  bio: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const trackSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  duration: z.string().optional().nullable(),
  trackNo: z.number().int().min(1),
  audioUrl: z.string().optional().nullable(),
});

export const albumSchema = z.object({
  title: z.string().min(1, 'Tiêu đề là bắt buộc'),
  slug: z.string().min(1).optional(),
  type: AlbumTypeEnum,
  releaseDate: z.string().optional().nullable(),
  coverUrl: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  spotifyUrl: z.string().optional().nullable(),
  youtubeUrl: z.string().optional().nullable(),
  isPublished: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  tracks: z.array(trackSchema).optional(),
});

export const eventSchema = z.object({
  title: z.string().min(1),
  venue: z.string().min(1),
  city: z.string().min(1),
  eventDate: z.string().min(1),
  imageUrl: z.string().optional().nullable(),
  ticketUrl: z.string().optional().nullable(),
  isPast: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export const galleryItemSchema = z.object({
  type: GalleryTypeEnum,
  url: z.string().min(1),
  thumbnail: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Tin nhắn tối thiểu 10 ký tự'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
