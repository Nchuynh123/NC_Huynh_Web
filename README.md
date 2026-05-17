# NC Huynh — Website fullstack

Monorepo: public site, admin CMS, Express API, Supabase (PostgreSQL + Auth + Storage).

## Cấu trúc

```
apps/web      — Public site (React + MUI, port 5173)
apps/admin    — Admin panel (port 5174)
server        — Express API (port 3001)
packages/shared — Types + Zod schemas
supabase/     — SQL migrations + hướng dẫn
```

## Chạy local

```bash
npm install
npm run build -w @band/shared

# Cấu hình server/.env (copy từ server/.env.example)
# SQLite dev: dùng Supabase local hoặc PostgreSQL — xem bên dưới

npm run db:generate -w server
npm run db:push -w server
npm run db:seed -w server

npm run dev
```

- Web: http://localhost:5173  
- Admin: http://localhost:5174 — đăng nhập `admin@band.local` / `admin123456` (khi chưa có Supabase Auth)

## Biến môi trường

| File | Mô tả |
|------|--------|
| `server/.env` | `DATABASE_URL`, `JWT_SECRET`, Supabase keys, `CORS_ORIGIN` |
| `apps/web/.env` | `VITE_API_URL` |
| `apps/admin/.env` | `VITE_API_URL`, `VITE_SUPABASE_*` (tùy chọn) |

## Deploy

### 1. Supabase

1. Tạo project → chạy migrations trong `supabase/migrations/`
2. `DATABASE_URL` + `DIRECT_URL` cho Prisma
3. Tạo admin user + `app_metadata: { "role": "admin" }` — xem `supabase/README.md`

### 2. API — Render

- Kết nối repo, dùng `render.yaml` hoặc:
  - Build: `npm install && npm run build -w @band/shared && npm run db:generate -w server && npm run build -w server`
  - Start: `npm run start -w server`
- Set env: `DATABASE_URL`, `SUPABASE_*`, `CORS_ORIGIN` (URL Vercel web + admin), `PUBLIC_URL` (URL Render)

### 3. Frontend — Vercel

**Project 1 — Public:** Root `apps/web`, build theo `apps/web/vercel.json`, env `VITE_API_URL=https://your-api.onrender.com`

**Project 2 — Admin:** Root `apps/admin`, env tương tự

Cập nhật `CORS_ORIGIN` trên API sau khi có URL Vercel.

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | API + web + admin |
| `npm run build` | Build toàn bộ |
| `npm run db:push` | Đồng bộ schema Prisma |
| `npm run db:seed` | Dữ liệu mẫu |
