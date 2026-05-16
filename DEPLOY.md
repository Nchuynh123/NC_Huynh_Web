# Hướng dẫn deploy

## Supabase

1. Tạo project tại [supabase.com](https://supabase.com)
2. SQL Editor: chạy lần lượt `supabase/migrations/*.sql`
3. Lấy connection string (URI) → `DATABASE_URL` trên Render
4. Authentication → Users → tạo admin, Raw App Meta Data: `{ "role": "admin" }`
5. API keys → `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

## Render (API)

1. New → Web Service → connect repo
2. Root: repository root
3. Build: `npm install && npm run build -w @band/shared && npm run db:generate -w server && npm run build -w server`
4. Start: `npm run db:push -w server && npm run start -w server`
5. Environment:
   - `DATABASE_URL` — Supabase pooler URI
   - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - `JWT_SECRET` — random string (backup dev auth)
   - `CORS_ORIGIN` — `https://your-web.vercel.app,https://your-admin.vercel.app`
   - `PUBLIC_URL` — `https://your-api.onrender.com`

Hoặc import `render.yaml`.

## Vercel — Public site

1. Import repo
2. Root Directory: `apps/web`
3. Build Command: `cd ../.. && npm install && npm run build -w @band/shared && npm run build -w @band/web`
4. Output: `dist`
5. Env: `VITE_API_URL=https://your-api.onrender.com`

## Vercel — Admin

1. Project mới, Root: `apps/admin`
2. Build: `cd ../.. && npm install && npm run build -w @band/shared && npm run build -w @band/admin`
3. Env: `VITE_API_URL` (cùng API URL)

## Sau deploy

1. Cập nhật `CORS_ORIGIN` trên Render với URL Vercel thật
2. Chạy seed một lần: `npm run db:seed -w server` (Render shell hoặc local với `DATABASE_URL` production)
3. Kiểm tra `/health` trên API
