import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControlLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memberSchema } from '@band/shared';
import type { Member } from '@band/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMember, deleteMember, fetchMembers, updateMember } from '../api/client';
import { ImageUpload } from '../components/ImageUpload';

type FormData = {
  name: string;
  role: string;
  bio?: string | null;
  photoUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
};

const empty: FormData = { name: '', role: '', bio: '', sortOrder: 0, isActive: true };

export function MembersPage() {
  const qc = useQueryClient();
  const { data: members = [] } = useQuery({ queryKey: ['members'], queryFn: fetchMembers });
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: empty,
  });

  const saveMutation = useMutation({
    mutationFn: (payload: FormData) =>
      editId ? updateMember(editId, payload) : createMember(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['members'] });
      setOpen(false);
      setEditId(null);
    },
  });

  const delMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['members'] }),
  });

  const openEdit = (m?: Member) => {
    if (m) {
      setEditId(m.id);
      reset({ name: m.name, role: m.role, bio: m.bio, photoUrl: m.photoUrl, sortOrder: m.sortOrder, isActive: m.isActive });
    } else {
      setEditId(null);
      reset(empty);
    }
    setOpen(true);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Thành viên</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => openEdit()}>
          Thêm
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tên</TableCell>
            <TableCell>Vai trò</TableCell>
            <TableCell>Active</TableCell>
            <TableCell align="right">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.role}</TableCell>
              <TableCell>{m.isActive ? 'Có' : 'Không'}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openEdit(m)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => delMutation.mutate(m.id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Sửa thành viên' : 'Thêm thành viên'}</DialogTitle>
        <form onSubmit={handleSubmit((v) => saveMutation.mutate(v))}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField label="Tên" {...register('name')} required />
              <TextField label="Vai trò" {...register('role')} required />
              <TextField label="Bio" multiline {...register('bio')} />
              <TextField label="Thứ tự" type="number" {...register('sortOrder', { valueAsNumber: true })} />
              <FormControlLabel control={<Switch {...register('isActive')} defaultChecked />} label="Hiển thị" />
              <ImageUpload value={watch('photoUrl')} onChange={(url) => setValue('photoUrl', url)} />
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
