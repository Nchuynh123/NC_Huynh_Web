-- Bucket band-assets: public read, upload qua service role (server API)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'band-assets',
  'band-assets',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read band assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'band-assets');
