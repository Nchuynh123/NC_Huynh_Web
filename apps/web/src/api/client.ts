import axios from 'axios';
import type {
  Album,
  ContactMessage,
  Event,
  GalleryItem,
  Member,
  SiteSettings,
} from '@band/shared';

const baseURL = import.meta.env.VITE_API_URL || '';

export const api = axios.create({ baseURL });

export const fetchSettings = () => api.get<SiteSettings>('/api/settings').then((r) => r.data);
export const fetchMembers = () => api.get<Member[]>('/api/members').then((r) => r.data);
export const fetchAlbums = () => api.get<Album[]>('/api/albums').then((r) => r.data);
export const fetchAlbum = (slug: string) =>
  api.get<Album>(`/api/albums/${slug}`).then((r) => r.data);
export const fetchEvents = (filter?: 'upcoming' | 'past') =>
  api
    .get<Event[]>('/api/events', { params: filter ? { filter } : undefined })
    .then((r) => r.data);
export const fetchGallery = () => api.get<GalleryItem[]>('/api/gallery').then((r) => r.data);
export const sendContact = (data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) => api.post<{ id: string; message: string }>('/api/contact', data).then((r) => r.data);

export type { ContactMessage };
