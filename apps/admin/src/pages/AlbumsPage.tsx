import { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { albumSchema, AlbumTypeEnum } from '@band/shared';
import type { Album } from '@band/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAlbum, deleteAlbum, fetchAlbums, updateAlbum } from '../api/client';
import { ImageUpload } from '../components/ImageUpload';

type FormData = {
  title: string;
  slug?: string;
  type: 'ALBUM' | 'EP' | 'SINGLE';
  releaseDate?: string | null;
  coverUrl?: string | null;
  description?: string | null;
  spotifyUrl?: string | null;
  youtubeUrl?: string | null;
  isPublished: boolean;
  sortOrder: number;
  tracks?: { title: string; duration?: string | null; trackNo: number; audioUrl?: string | null }[];
};

export function AlbumsPage() {
  const qc = useQueryClient();
  const { data: albums = [] } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch, control } = useForm<FormData>({
    resolver: zodResolver(albumSchema),
    defaultValues: { title: '', type: 'ALBUM', isPublished: false, sortOrder: 0, tracks: [] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'tracks' });

  const saveMutation = useMutation({
    mutationFn: (payload: FormData) =>
      editId ? updateAlbum(editId, payload) : createAlbum(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['albums'] });
      setOpen(false);
    },
  });

  const delMutation = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['albums'] }),
  });

  const openEdit = (a?: Album) => {
    if (a) {
      setEditId(a.id);
      reset({
        title: a.title,
        slug: a.slug,
        type: a.type,
        releaseDate: a.releaseDate?.slice(0, 10) ?? null,
        coverUrl: a.coverUrl,
        description: a.description,
        spotifyUrl: a.spotifyUrl,
        youtubeUrl: a.youtubeUrl,
        isPublished: a.isPublished,
        sortOrder: a.sortOrder,
        tracks: a.tracks?.map((t) => ({
          title: t.title,
          duration: t.duration,
          trackNo: t.trackNo,
          audioUrl: t.audioUrl,
        })) ?? [],
      });
    } else {
      setEditId(null);
      reset({ title: '', type: 'ALBUM', isPublished: false, sortOrder: 0, tracks: [{ title: '', trackNo: 1 }] });
    }
    setOpen(true);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Album / EP / Single</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => openEdit()}>
          Thêm
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tiêu đề</TableCell>
            <TableCell>Loại</TableCell>
            <TableCell>Publish</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {albums.map((a) => (
            <TableRow key={a.id}>
              <TableCell>{a.title}</TableCell>
              <TableCell>{a.type}</TableCell>
              <TableCell>{a.isPublished ? 'Có' : 'Không'}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openEdit(a)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => delMutation.mutate(a.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editId ? 'Sửa album' : 'Thêm album'}</DialogTitle>
        <form onSubmit={handleSubmit((v) => saveMutation.mutate(v))}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField label="Tiêu đề" {...register('title')} required />
              <TextField label="Slug (tùy chọn)" {...register('slug')} />
              <TextField select label="Loại" {...register('type')} defaultValue="ALBUM">
                {AlbumTypeEnum.options.map((o) => (
                  <MenuItem key={o} value={o}>{o}</MenuItem>
                ))}
              </TextField>
              <TextField label="Ngày phát hành" type="date" InputLabelProps={{ shrink: true }} {...register('releaseDate')} />
              <TextField label="Mô tả" multiline {...register('description')} />
              <ImageUpload value={watch('coverUrl')} onChange={(url) => setValue('coverUrl', url)} label="Cover" />
              <FormControlLabel control={<Checkbox {...register('isPublished')} />} label="Xuất bản" />
              <Typography variant="subtitle1">Tracklist</Typography>
              {fields.map((field, i) => (
                <Stack key={field.id} direction="row" spacing={1}>
                  <TextField label="#" type="number" sx={{ width: 70 }} {...register(`tracks.${i}.trackNo`, { valueAsNumber: true })} />
                  <TextField label="Tên bài" fullWidth {...register(`tracks.${i}.title`)} />
                  <TextField label="Duration" sx={{ width: 100 }} {...register(`tracks.${i}.duration`)} />
                  <Button color="error" onClick={() => remove(i)}>Xóa</Button>
                </Stack>
              ))}
              <Button onClick={() => append({ title: '', trackNo: fields.length + 1 })}>+ Track</Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Hủy</Button>
            <Button type="submit" variant="contained">Lưu</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
