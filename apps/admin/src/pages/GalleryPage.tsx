import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { galleryItemSchema, GalleryTypeEnum } from '@band/shared';
import type { GalleryItem } from '@band/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGalleryItem, deleteGalleryItem, fetchGallery, updateGalleryItem } from '../api/client';
import { ImageUpload } from '../components/ImageUpload';

type FormData = {
  type: 'IMAGE' | 'VIDEO';
  url: string;
  thumbnail?: string | null;
  caption?: string | null;
  sortOrder: number;
};

export function GalleryPage() {
  const qc = useQueryClient();
  const { data: items = [] } = useQuery({ queryKey: ['gallery'], queryFn: fetchGallery });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(galleryItemSchema),
    defaultValues: { type: 'IMAGE', url: '', sortOrder: 0 },
  });

  const saveMutation = useMutation({
    mutationFn: (payload: FormData) =>
      editId ? updateGalleryItem(editId, payload) : createGalleryItem(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['gallery'] });
      setOpen(false);
    },
  });

  const delMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] }),
  });

  const openEdit = (item?: GalleryItem) => {
    if (item) {
      setEditId(item.id);
      reset(item);
    } else {
      setEditId(null);
      reset({ type: 'IMAGE', url: '', sortOrder: 0 });
    }
    setOpen(true);
  };

  const isImage = watch('type') === 'IMAGE';

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Gallery</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => openEdit()}>
          Thêm
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loại</TableCell>
            <TableCell>Caption</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.caption ?? '—'}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openEdit(item)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => delMutation.mutate(item.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Sửa item' : 'Thêm gallery'}</DialogTitle>
        <form onSubmit={handleSubmit((v) => saveMutation.mutate(v))}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField select label="Loại" {...register('type')}>
                {GalleryTypeEnum.options.map((o) => (
                  <MenuItem key={o} value={o}>{o}</MenuItem>
                ))}
              </TextField>
              {isImage ? (
                <ImageUpload value={watch('url')} onChange={(url) => setValue('url', url)} />
              ) : (
                <TextField label="URL embed (YouTube)" {...register('url')} required fullWidth />
              )}
              <TextField label="Caption" {...register('caption')} />
              <TextField label="Thứ tự" type="number" {...register('sortOrder', { valueAsNumber: true })} />
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
