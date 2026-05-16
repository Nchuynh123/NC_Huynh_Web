import { useState } from 'react';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { contactSchema } from '@band/shared';
import { sendContact } from '../api/client';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Dữ liệu không hợp lệ');
      return;
    }
    setLoading(true);
    try {
      const res = await sendContact(parsed.data);
      setSuccess(res.message);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setError('Gửi tin nhắn thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          label="Họ tên"
          required
          fullWidth
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Chủ đề"
          fullWidth
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <TextField
          label="Tin nhắn"
          required
          multiline
          rows={5}
          fullWidth
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ alignSelf: 'flex-start' }}>
          {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
        </Button>
      </Stack>
    </form>
  );
}
