# Supabase setup

## 1. Tạo project

1. [supabase.com](https://supabase.com) → New project
2. Lấy **Project URL**, **anon key**, **service_role key**, **JWT secret**
3. Settings → Database → Connection string (URI) cho `DATABASE_URL` và `DIRECT_URL` (pooler vs direct)

## 2. Chạy migrations

SQL Editor hoặc CLI:

```bash
# Áp dụng theo thứ tự trong supabase/migrations/
```

Hoặc dùng Prisma từ repo root:

```bash
npm run db:push -w server
npm run db:seed -w server
```

## 3. Storage bucket `band-assets`

Migration `20250101000001_storage.sql` tạo bucket public. Upload chỉ qua API (service role).

## 4. Admin user

1. Authentication → Users → Add user (email + password)
2. User → Edit → **Raw App Meta Data**:

```json
{ "role": "admin" }
```

3. Đăng nhập tại admin app (`/login`)

## Biến môi trường

Xem `server/.env.example`, `apps/web/.env.example`, `apps/admin/.env.example`.
