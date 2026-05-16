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

export function setAuthToken(token: string | null) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

export const login = (email: string, password: string) =>
  api.post<{ token: string }>('/api/admin/login', { email, password }).then((r) => r.data);

export const fetchStats = () =>
  api
    .get<{ albums: number; members: number; events: number; contacts: number; unread: number }>(
      '/api/admin/stats'
    )
    .then((r) => r.data);

export const fetchSettings = () => api.get<SiteSettings>('/api/settings').then((r) => r.data);
export const updateSettings = (data: unknown) =>
  api.put<SiteSettings>('/api/admin/settings', data).then((r) => r.data);

export const fetchMembers = () => api.get<Member[]>('/api/admin/members').then((r) => r.data);
export const createMember = (data: unknown) => api.post<Member>('/api/admin/members', data).then((r) => r.data);
export const updateMember = (id: string, data: unknown) =>
  api.put<Member>(`/api/admin/members/${id}`, data).then((r) => r.data);
export const deleteMember = (id: string) => api.delete(`/api/admin/members/${id}`);

export const fetchAlbums = () => api.get<Album[]>('/api/admin/albums').then((r) => r.data);
export const createAlbum = (data: unknown) => api.post<Album>('/api/admin/albums', data).then((r) => r.data);
export const updateAlbum = (id: string, data: unknown) =>
  api.put<Album>(`/api/admin/albums/${id}`, data).then((r) => r.data);
export const deleteAlbum = (id: string) => api.delete(`/api/admin/albums/${id}`);

export const fetchEvents = () => api.get<Event[]>('/api/admin/events').then((r) => r.data);
export const createEvent = (data: unknown) => api.post<Event>('/api/admin/events', data).then((r) => r.data);
export const updateEvent = (id: string, data: unknown) =>
  api.put<Event>(`/api/admin/events/${id}`, data).then((r) => r.data);
export const deleteEvent = (id: string) => api.delete(`/api/admin/events/${id}`);

export const fetchGallery = () => api.get<GalleryItem[]>('/api/admin/gallery').then((r) => r.data);
export const createGalleryItem = (data: unknown) =>
  api.post<GalleryItem>('/api/admin/gallery', data).then((r) => r.data);
export const updateGalleryItem = (id: string, data: unknown) =>
  api.put<GalleryItem>(`/api/admin/gallery/${id}`, data).then((r) => r.data);
export const deleteGalleryItem = (id: string) => api.delete(`/api/admin/gallery/${id}`);

export const fetchContacts = () => api.get<ContactMessage[]>('/api/admin/contacts').then((r) => r.data);
export const markContactRead = (id: string) =>
  api.patch<ContactMessage>(`/api/admin/contacts/${id}/read`).then((r) => r.data);

export const uploadImage = (file: File) => {
  const form = new FormData();
  form.append('file', file);
  return api.post<{ url: string }>('/api/admin/upload', form).then((r) => r.data);
};
