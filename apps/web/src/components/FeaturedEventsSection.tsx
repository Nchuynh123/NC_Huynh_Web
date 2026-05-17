import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import type { Event } from '@band/shared';
import { useTheme } from '@mui/material/styles';

interface FeaturedEventsSectionProps {
  events: Event[];
  isLoading: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function FeaturedEventsSection({ events, isLoading }: FeaturedEventsSectionProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const upcomingEvents = events.filter(e => !e.isPast);
  const pastEvents = events.filter(e => e.isPast);
  const hasUpcoming = upcomingEvents.length > 0;
  const displayEvents = hasUpcoming ? upcomingEvents : pastEvents;
  const featuredEvents = displayEvents.slice(0, 4);
  const totalEventsCount = displayEvents.length;

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
      {/* Decorative Glow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '40%',
          height: '40%',
          bgcolor: 'primary.main',
          filter: 'blur(150px)',
          opacity: isDark ? 0.04 : 0.02,
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.4em', mb: 1, display: 'block' }}
          >
            TOUR DATES
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
              mb: 1
            }}
          >
            {hasUpcoming ? 'Lịch diễn sắp tới' : 'Lịch diễn đã qua'}{' '}
            <Box 
              component="span" 
              sx={{ 
                color: 'primary.main', 
                WebkitTextFillColor: 'initial',
                fontWeight: 600,
                fontSize: { xs: '1.6rem', md: '2.2rem' },
                ml: 1,
                fontFamily: '"Outfit", sans-serif'
              }}
            >
              ({totalEventsCount})
            </Box>
            <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
          </Typography>
        </Box>

        <Box>
          {isLoading ? (
            <Grid container spacing={3}>
              {[0, 1, 2, 3].map((i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Skeleton variant="rounded" height={280} sx={{ borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                </Grid>
              ))}
            </Grid>
          ) : featuredEvents.length === 0 ? (
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
                Chưa có lịch diễn nào được công bố.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {featuredEvents.map((ev) => (
                <Grid item xs={12} sm={6} md={3} key={ev.id}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      height: 280,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.02)',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-6px)',
                        boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.4)' : '0 12px 30px rgba(0,0,0,0.06)',
                        '& .event-bg': { transform: 'scale(1.05)' },
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
                    {/* Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 100%)',
                        zIndex: 1
                      }}
                    />

                    {/* Content */}
                    <Box sx={{ position: 'relative', zIndex: 2, p: 2.5, width: '100%' }}>
                      {/* Status Chip */}
                      <Box sx={{ mb: 1 }}>
                        {ev.isPast ? (
                          <Chip
                            label="COMPLETED"
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255,255,255,0.15)',
                              color: 'white',
                              fontWeight: 800,
                              fontSize: '0.55rem',
                              height: 20,
                              backdropFilter: 'blur(5px)',
                              border: '1px solid rgba(255,255,255,0.1)'
                            }}
                          />
                        ) : (
                          <Chip
                            label="UPCOMING"
                            size="small"
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'white',
                              fontWeight: 800,
                              fontSize: '0.55rem',
                              height: 20,
                              boxShadow: '0 4px 10px rgba(255,45,85,0.3)'
                            }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 900,
                          fontFamily: '"Outfit", "Inter", sans-serif',
                          color: 'white',
                          lineHeight: 1.2,
                          mb: 1.5,
                          fontSize: '1.1rem',
                          letterSpacing: '-0.01em',
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}
                      >
                        {ev.title}
                      </Typography>

                      <Stack spacing={0.8}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <EventIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                          <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                            {formatDate(ev.eventDate)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <PlaceIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                          <Typography variant="caption" noWrap sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                            {ev.venue}
                          </Typography>
                        </Stack>
                      </Stack>

                      {!ev.isPast && ev.ticketUrl && (
                        <Button
                          href={ev.ticketUrl}
                          target="_blank"
                          rel="noopener"
                          variant="contained"
                          size="small"
                          fullWidth
                          sx={{
                            mt: 2,
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' }
                          }}
                        >
                          Mua vé
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            component={Link}
            to="/events"
            variant="outlined"
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.2,
              fontWeight: 800,
              textTransform: 'none',
              fontSize: '0.9rem',
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(255,45,85,0.05)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Xem tất cả lịch diễn
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
