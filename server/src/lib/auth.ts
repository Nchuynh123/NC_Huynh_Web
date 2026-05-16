import { createClient, SupabaseClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import type { Request } from 'express';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

let supabaseAdmin: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (supabaseAdmin) return supabaseAdmin;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  supabaseAdmin = createClient(url, key);
  return supabaseAdmin;
}

export async function verifyToken(token: string): Promise<AuthUser | null> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return null;
    const role =
      (data.user.app_metadata as { role?: string })?.role ??
      (data.user.user_metadata as { role?: string })?.role ??
      'user';
    if (role !== 'admin') return null;
    return { id: data.user.id, email: data.user.email ?? '', role };
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;
  try {
    const payload = jwt.verify(token, secret) as { sub: string; email: string; role: string };
    if (payload.role !== 'admin') return null;
    return { id: payload.sub, email: payload.email, role: payload.role };
  } catch {
    return null;
  }
}

export function signDevToken(email: string): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not configured');
  return jwt.sign({ sub: 'dev-admin', email, role: 'admin' }, secret, { expiresIn: '7d' });
}

export async function loginWithPassword(
  email: string,
  password: string
): Promise<{ token: string } | { error: string }> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.session) return { error: error?.message ?? 'Đăng nhập thất bại' };
    const role =
      (data.user?.app_metadata as { role?: string })?.role ??
      (data.user?.user_metadata as { role?: string })?.role;
    if (role !== 'admin') return { error: 'Bạn không có quyền admin' };
    return { token: data.session.access_token };
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@band.local';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123456';
  if (email !== adminEmail || password !== adminPassword) {
    return { error: 'Email hoặc mật khẩu không đúng' };
  }
  return { token: signDevToken(email) };
}

export function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}
