import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchContacts, markContactRead } from '../api/client';

export function ContactsPage() {
  const qc = useQueryClient();
  const { data: messages = [] } = useQuery({ queryKey: ['contacts'], queryFn: fetchContacts });

  const readMutation = useMutation({
    mutationFn: markContactRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contacts'] }),
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Tin nhắn liên hệ
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trạng thái</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nội dung</TableCell>
            <TableCell>Ngày</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((m) => (
            <TableRow key={m.id}>
              <TableCell>
                <Chip label={m.isRead ? 'Đã đọc' : 'Mới'} color={m.isRead ? 'default' : 'primary'} size="small" />
              </TableCell>
              <TableCell>{m.name}</TableCell>
              <TableCell>{m.email}</TableCell>
              <TableCell sx={{ maxWidth: 280 }}>{m.message.slice(0, 80)}...</TableCell>
              <TableCell>{new Date(m.createdAt).toLocaleString('vi-VN')}</TableCell>
              <TableCell>
                {!m.isRead && (
                  <IconButton onClick={() => readMutation.mutate(m.id)} title="Đánh dấu đã đọc">
                    <MarkEmailReadIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
