-- Chạy toàn bộ file này trong Supabase → SQL Editor → Run
-- (Sau khi chạy 20250101000000_initial.sql nếu chưa có bảng)

-- Seed SiteSettings
INSERT INTO "SiteSettings" ("id", "bandName", "tagline", "about", "socialLinks", "updatedAt")
VALUES (
  'default',
  'NC Huynh Band',
  'Âm nhạc từ trái tim',
  'NC Huynh Band là ban nhạc độc lập, mang đến những giai điệu đầy cảm xúc.',
  '{"spotify":"https://open.spotify.com","youtube":"https://youtube.com","instagram":"https://instagram.com","facebook":"https://facebook.com"}'::jsonb,
  NOW()
)
ON CONFLICT ("id") DO NOTHING;

-- Seed members (chỉ khi bảng trống)
INSERT INTO "Member" ("id", "name", "role", "bio", "sortOrder", "isActive", "createdAt")
SELECT gen_random_uuid()::text, v.name, v.role, v.bio, v.ord, true, NOW()
FROM (VALUES
  ('Nguyễn Văn A', 'Vocal / Guitar', 'Frontman và nhạc sĩ chính của band.', 0),
  ('Trần Thị B', 'Bass', 'Nền tảng groove vững chắc cho mọi bản nhạc.', 1),
  ('Lê Văn C', 'Drums', 'Nhịp trống mạnh mẽ, đầy năng lượng.', 2)
) AS v(name, role, bio, ord)
WHERE NOT EXISTS (SELECT 1 FROM "Member" LIMIT 1);
