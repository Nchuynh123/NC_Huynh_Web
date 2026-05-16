import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

export async function uploadFile(
  file: Express.Multer.File
): Promise<string> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey);
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    const filePath = `uploads/${filename}`;

    const { error } = await supabase.storage
      .from('band-assets')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from('band-assets').getPublicUrl(filePath);
    return data.publicUrl;
  }

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const ext = path.extname(file.originalname) || '.jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);
  fs.writeFileSync(filepath, file.buffer);

  const base = process.env.PUBLIC_URL ?? `http://localhost:${process.env.PORT ?? 3001}`;
  return `${base}/uploads/${filename}`;
}
