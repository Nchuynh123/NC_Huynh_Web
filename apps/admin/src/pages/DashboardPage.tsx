import { Grid, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api/client';

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h3" color="primary">
        {value}
      </Typography>
      <Typography color="text.secondary">{label}</Typography>
    </Paper>
  );
}

export function DashboardPage() {
  const { data } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Album" value={data?.albums ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Thành viên" value={data?.members ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Sự kiện sắp tới" value={data?.events ?? 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Tin nhắn chưa đọc" value={data?.unread ?? 0} />
        </Grid>
      </Grid>
    </>
  );
}
