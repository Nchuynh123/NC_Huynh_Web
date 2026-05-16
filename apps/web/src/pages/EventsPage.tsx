import { Container, Grid, Box, Typography, Divider, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../api/client';
import { EventTimeline } from '../components/EventTimeline';

export function EventsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: upcoming } = useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => fetchEvents('upcoming'),
  });
  const { data: past } = useQuery({
    queryKey: ['events', 'past'],
    queryFn: () => fetchEvents('past'),
  });

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
            SHOWS & EVENTS
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
            Lịch diễn <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
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
            Cập nhật những điểm dừng chân tiếp theo và nhìn lại hành trình âm nhạc của NC Huynh.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Upcoming Events Column */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", "Inter", sans-serif', color: 'text.primary', mb: 1 }}>
                Sắp diễn ra
              </Typography>
              <Divider sx={{ width: 40, height: 4, bgcolor: 'primary.main', borderRadius: 2, border: 'none' }} />
            </Box>
            <EventTimeline events={upcoming ?? []} />
          </Grid>

          {/* Past Events Column */}
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: '"Outfit", "Inter", sans-serif', color: 'text.secondary', opacity: 0.6, mb: 1 }}>
                Đã diễn ra
              </Typography>
              <Divider sx={{ width: 40, height: 4, bgcolor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', borderRadius: 2, border: 'none' }} />
            </Box>
            <EventTimeline events={past ?? []} past />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
