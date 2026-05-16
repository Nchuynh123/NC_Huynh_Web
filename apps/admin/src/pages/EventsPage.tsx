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
import { eventSchema } from '@band/shared';
import type { Event } from '@band/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createEvent, deleteEvent, fetchEvents, updateEvent } from '../api/client';
import { ImageUpload } from '../components/ImageUpload';

type FormData = {
  title: string;
  venue: string;
  city: string;
  eventDate: string;
  imageUrl?: string | null;
  ticketUrl?: string | null;
  isPast: boolean;
  isPublished: boolean;
};

export function EventsPage() {
  const qc = useQueryClient();
  const { data: events = [] } = useQuery({ queryKey: ['events'], queryFn: fetchEvents });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: '', venue: '', city: '', eventDate: '', imageUrl: '', ticketUrl: '', isPast: false, isPublished: true },
  });

  const saveMutation = useMutation({
    mutationFn: (payload: FormData) =>
      editId ? updateEvent(editId, payload) : createEvent(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] });
      setOpen(false);
    },
  });

  const delMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });

  const openEdit = (ev?: Event) => {
    if (ev) {
      setEditId(ev.id);
      reset({
        title: ev.title,
        venue: ev.venue,
        city: ev.city,
        eventDate: ev.eventDate.slice(0, 16),
        imageUrl: ev.imageUrl || '',
        ticketUrl: ev.ticketUrl || '',
        isPast: ev.isPast,
        isPublished: ev.isPublished,
      });
    } else {
      setEditId(null);
      reset({ title: '', venue: '', city: '', eventDate: '', imageUrl: '', ticketUrl: '', isPast: false, isPublished: true });
    }
    setOpen(true);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Lịch diễn</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => openEdit()}>
          Thêm
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sự kiện</TableCell>
            <TableCell>Địa điểm</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((ev) => (
            <TableRow key={ev.id}>
              <TableCell>{ev.title}</TableCell>
              <TableCell>{ev.venue}, {ev.city}</TableCell>
              <TableCell>{new Date(ev.eventDate).toLocaleDateString('vi-VN')}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openEdit(ev)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => delMutation.mutate(ev.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Sửa sự kiện' : 'Thêm sự kiện'}</DialogTitle>
        <form onSubmit={handleSubmit((v) => saveMutation.mutate(v))}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField label="Tiêu đề" {...register('title')} required />
              <TextField label="Venue" {...register('venue')} required />
              <TextField label="Thành phố" {...register('city')} required />
              <TextField label="Ngày giờ" type="datetime-local" InputLabelProps={{ shrink: true }} {...register('eventDate')} required />

              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>Ảnh sự kiện</Typography>
              <ImageUpload
                value={watch('imageUrl')}
                onChange={(url) => setValue('imageUrl', url)}
              />
              <TextField label="Hoặc nhập URL Ảnh" {...register('imageUrl')} fullWidth />

              <TextField label="Link vé" {...register('ticketUrl')} />
              <FormControlLabel control={<Checkbox {...register('isPast')} />} label="Đã qua" />
              <FormControlLabel control={<Checkbox {...register('isPublished')} defaultChecked />} label="Xuất bản" />
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
