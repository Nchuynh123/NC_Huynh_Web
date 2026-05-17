import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { fetchMembers } from '../api/client';
import { MemberCard } from '../components/MemberCard';

export function MembersPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: members, isLoading } = useQuery({ queryKey: ['members'], queryFn: fetchMembers });

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '0.4em',
              display: 'block',
              mb: 1,
              fontSize: '0.75rem'
            }}
          >
            THE LINEUP
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontFamily: '"Outfit", "Inter", sans-serif',
              color: 'text.primary',
              background: isDark 
                ? 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.4) 100%)'
                : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              letterSpacing: '-0.02em'
            }}
          >
            Thành viên <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1rem',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              opacity: 0.8
            }}
          >
            Những tâm hồn đồng điệu, cùng nhau tạo nên những giai điệu đầy cảm xúc của NC Huynh.
          </Typography>
        </Box>

        {/* Members Grid */}
        <Grid container spacing={4}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
              <Grid key={i} item xs={12} sm={6} md={3}>
                <Skeleton
                  variant="rounded"
                  height={420}
                  sx={{ 
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                    borderRadius: 5 
                  }}
                />
              </Grid>
            ))
            : members?.map((m) => (
              <Grid key={m.id} item xs={12} sm={6} md={3}>
                <MemberCard member={m} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
