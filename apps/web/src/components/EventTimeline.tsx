import { Box, Button, Paper, Chip, Stack, Typography, Grid } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import type { Event } from '@band/shared';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

import { useTheme } from '@mui/material/styles';

export function EventTimeline({ events, past }: { events: Event[]; past?: boolean }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!events.length) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          borderRadius: 4,
          border: isDark ? '1px dashed rgba(255,255,255,0.1)' : '1px dashed rgba(0,0,0,0.1)'
        }}
      >
        <Typography sx={{ color: 'text.secondary', opacity: 0.5, fontFamily: '"Inter", sans-serif' }}>
          {past ? 'Chưa có dữ liệu sự kiện cũ.' : 'Hiện chưa có lịch diễn mới.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {events.map((ev) => (
        <Paper
          key={ev.id}
          elevation={0}
          sx={{
            borderRadius: 3.5,
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease',
            minHeight: { xs: 85, sm: 100 },
            display: 'flex',
            alignItems: 'center',
            boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.02)',
            '&:hover': {
              borderColor: 'primary.main',
              transform: 'translateX(6px)',
              boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.06)',
              '& .event-bg': { transform: 'scale(1.05)' },
              '& .event-overlay': { 
                background: isDark 
                  ? 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)'
                  : 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)'
              }
            }
          }}
        >
          {/* Background Image */}
          <Box
            className="event-bg"
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: ev.imageUrl ? `url(${ev.imageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 0
            }}
          />
          {/* Dynamic Overlay */}
          <Box
            className="event-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark 
                ? 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%)'
                : 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(1px)',
              transition: 'background 0.3s ease',
              zIndex: 1
            }}
          />

          {/* Content Wrapper */}
          <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 2, sm: 2.5 }, width: '100%' }}>
            <Grid container alignItems="center" spacing={2}>
              {/* Main Info */}
              <Grid item xs={true}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    fontFamily: '"Outfit", "Inter", sans-serif',
                    color: 'text.primary',
                    lineHeight: 1.1,
                    mb: 1,
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    textShadow: isDark ? '0 2px 8px rgba(0,0,0,0.8)' : 'none',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {ev.title}
                </Typography>

                <Stack direction="row" spacing={3} alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EventIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: '"Inter", sans-serif', color: 'text.secondary', fontSize: '0.8rem' }}>
                      {formatDate(ev.eventDate)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PlaceIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                    <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontFamily: '"Inter", sans-serif', color: 'text.secondary', fontSize: '0.8rem' }}>
                      {ev.venue}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              {/* Action/Status */}
              <Grid item sx={{ flexShrink: 0 }}>
                {past ? (
                  <Chip
                    label="COMPLETED"
                    sx={{
                      bgcolor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
                      color: 'text.primary',
                      fontWeight: 800,
                      fontSize: '0.6rem',
                      height: 24,
                      px: 1,
                      backdropFilter: 'blur(10px)',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                    }}
                  />
                ) : (
                  ev.ticketUrl && (
                    <Button
                      href={ev.ticketUrl}
                      target="_blank"
                      rel="noopener"
                      variant="contained"
                      size="medium"
                      sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        px: 3,
                        boxShadow: isDark ? '0 8px 20px rgba(255,45,85,0.4)' : '0 8px 20px rgba(255,45,85,0.2)',
                        '&:hover': { boxShadow: isDark ? '0 10px 25px rgba(255,45,85,0.6)' : '0 10px 25px rgba(255,45,85,0.4)' }
                      }}
                    >
                      Mua vé
                    </Button>
                  )
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}
