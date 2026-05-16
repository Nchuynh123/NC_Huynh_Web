import { useEffect } from 'react';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteSettingsSchema, type SiteSettings } from '@band/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSettings, updateSettings } from '../api/client';
import { ImageUpload } from '../components/ImageUpload';

type FormData = {
  bandName: string;
  tagline?: string | null;
  about?: string | null;
  logoUrl?: string | null;
  heroImageUrl?: string | null;
  socialLinks?: SiteSettings['socialLinks'];
};

export function SettingsPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(siteSettingsSchema),
  });

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
  });

  useEffect(() => {
    if (data) {
      reset({
        bandName: data.bandName,
        tagline: data.tagline,
        about: data.about,
        logoUrl: data.logoUrl,
        heroImageUrl: data.heroImageUrl,
        socialLinks: data.socialLinks ?? {},
      });
    }
  }, [data, reset]);

  if (isLoading) return <Typography>Đang tải...</Typography>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Cài đặt website
      </Typography>
      <Box component="form" onSubmit={handleSubmit((v) => mutation.mutate(v))} sx={{ maxWidth: 640, mt: 2 }}>
        <Stack spacing={2}>
          {mutation.isSuccess && <Alert severity="success">Đã lưu</Alert>}
          {mutation.isError && <Alert severity="error">Lưu thất bại</Alert>}
          <TextField label="Tên band" {...register('bandName')} error={!!errors.bandName} helperText={errors.bandName?.message} />
          <TextField label="Tagline" {...register('tagline')} />
          <TextField label="Giới thiệu" multiline rows={6} {...register('about')} />
          <ImageUpload label="Logo" value={watch('logoUrl')} onChange={(url) => setValue('logoUrl', url)} />
          <ImageUpload label="Hero image" value={watch('heroImageUrl')} onChange={(url) => setValue('heroImageUrl', url)} />
          <TextField label="Spotify URL" {...register('socialLinks.spotify')} />
          <TextField label="YouTube URL" {...register('socialLinks.youtube')} />
          <TextField label="Instagram URL" {...register('socialLinks.instagram')} />
          <TextField label="Facebook URL" {...register('socialLinks.facebook')} />
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            Lưu cài đặt
          </Button>
        </Stack>
      </Box>
    </>
  );
}
