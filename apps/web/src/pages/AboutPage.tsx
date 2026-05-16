import { Container, Grid, Box, Typography, Stack, Paper, Skeleton, Divider, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchSettings, fetchEvents, fetchMembers, fetchAlbums } from '../api/client';
import type { Event } from '@band/shared';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupsIcon from '@mui/icons-material/Groups';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import StarsIcon from '@mui/icons-material/Stars';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function AboutPage() {
  const navigate = useNavigate();
  const { data: settings, isLoading: settingsLoading } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
  const { data: pastEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['events', 'past'],
    queryFn: () => fetchEvents('past')
  }) as { data: Event[] | undefined, isLoading: boolean };
  const { data: members = [] } = useQuery({ queryKey: ['members'], queryFn: fetchMembers });
  const { data: albums = [] } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });

  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - 2024;

  const totalTracks = albums.reduce((acc, album) => acc + (album.tracks?.length || 0), 0);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const stats = [
    { label: 'Năm hoạt động', value: `${yearsActive}+`, icon: <CalendarMonthIcon color="primary" sx={{ fontSize: '1.2rem' }} />, path: null },
    { label: 'Show diễn', value: pastEvents?.length ?? 0, icon: <StarsIcon color="primary" sx={{ fontSize: '1.2rem' }} />, path: '/events' },
    { label: 'Thành viên', value: members.length, icon: <GroupsIcon color="primary" sx={{ fontSize: '1.2rem' }} />, path: '/members' },
    { label: 'Sản phẩm', value: totalTracks, icon: <MusicNoteIcon color="primary" sx={{ fontSize: '1.2rem' }} />, path: '/music' },
  ];

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="lg" sx={{ mt: 6, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3} alignItems="stretch">
          {/* Intro Section */}
          <Grid item xs={12} lg={9}>
            <Paper
              elevation={0}
              sx={{
                height: { xs: 'auto', md: 400 },
                p: { xs: 2, md: 3 },
                borderRadius: 5,
                bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(40px)',
                border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
                boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <Grid container spacing={3} sx={{ height: '100%' }} alignItems="center">
                <Grid item xs={12} md={7}>
                  <Box sx={{ pl: { md: 2 } }}>
                    <Typography
                      variant="overline"
                      sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.25em', mb: 1, display: 'block', fontSize: '0.65rem' }}
                    >
                      EST. 2017
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: '"Outfit", "Inter", sans-serif',
                        fontWeight: 900,
                        mb: 1.5,
                        background: isDark
                          ? 'linear-gradient(to right, #fff 40%, rgba(255,255,255,0.5) 100%)'
                          : 'linear-gradient(to right, #121212 40%, rgba(18,18,18,0.5) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '1.8rem', md: '2.2rem' }
                      }}
                    >
                      NC Huynh <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
                    </Typography>

                    {settingsLoading ? (
                      <Stack spacing={1}>
                        <Skeleton height={20} />
                        <Skeleton height={20} />
                        <Skeleton height={20} width="80%" />
                      </Stack>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          textAlign: 'justify',
                          fontSize: '0.9rem',
                          borderLeft: '2px solid rgba(255,45,85,0.3)',
                          pl: 2.5
                        }}
                      >
                        {settings?.about ?? 'Đang cập nhật thông tin giới thiệu...'}
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={5} sx={{ height: '100%' }}>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 15px 35px rgba(0,0,0,0.1)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)'
                    }}>
                      <img
                        src={settings?.heroImageUrl ?? '/placeholder-band.jpg'}
                        alt="NC Huynh Band"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top'
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Stats Sidebar */}
          <Grid item xs={12} lg={3}>
            <Grid container spacing={1.5} sx={{ height: { xs: 'auto', lg: 400 } }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} lg={12} key={index}>
                  <Paper
                    onClick={() => stat.path && navigate(stat.path)}
                    sx={{
                      height: '100%',
                      p: { xs: 1.5, md: 2 },
                      borderRadius: 4,
                      bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(20px)',
                      border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: stat.path ? 'pointer' : 'default',
                      boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
                      '&:hover': stat.path ? {
                        bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,1)',
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: isDark ? '0 10px 30px rgba(255,45,85,0.15)' : '0 10px 30px rgba(255,45,85,0.1)',
                        '& .stat-icon-bg': {
                          transform: 'scale(1.1)',
                          bgcolor: 'rgba(255,45,85,0.1)'
                        },
                        '& .nav-arrow': {
                          opacity: 1,
                          transform: 'translateX(5px)'
                        }
                      } : {}
                    }}
                  >
                    <Box
                      className="stat-icon-bg"
                      sx={{
                        width: { xs: 32, md: 40 },
                        height: { xs: 32, md: 40 },
                        borderRadius: '10px',
                        bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: { xs: 1.5, md: 2 },
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box sx={{ textAlign: 'left', flexGrow: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 900,
                          fontFamily: '"Outfit", "Inter", sans-serif',
                          color: 'text.primary',
                          lineHeight: 1,
                          fontSize: { xs: '1.1rem', md: '1.3rem' }
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          opacity: 0.6,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontSize: { xs: '0.5rem', md: '0.55rem' },
                          mt: 0.5,
                          display: 'block'
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                    {stat.path && (
                      <ArrowForwardIcon
                        className="nav-arrow"
                        sx={{
                          fontSize: '0.9rem',
                          color: 'primary.main',
                          opacity: 0.3,
                          transition: 'all 0.3s ease',
                          display: { xs: 'none', sm: 'block' }
                        }}
                      />
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Past Shows Section */}
        <Box sx={{ mt: 8 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: '"Outfit", "Inter", sans-serif', color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}>
              Dấu chân sân khấu
            </Typography>
            <Divider sx={{ flexGrow: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }} />
          </Stack>

          <Grid container spacing={3}>
            {eventsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={250} sx={{ borderRadius: 3, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                </Grid>
              ))
            ) : pastEvents && pastEvents.length > 0 ? (
              [...pastEvents]
                .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
                .map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <Paper
                      sx={{
                        height: '100%',
                        borderRadius: 3,
                        overflow: 'hidden',
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                        border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                        transition: 'all 0.3s',
                        boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          borderColor: 'primary.main',
                          boxShadow: isDark ? '0 20px 40px rgba(255,45,85,0.1)' : '0 20px 40px rgba(0,0,0,0.08)',
                          '& .show-img': { transform: 'scale(1.1)' }
                        }
                      }}
                    >
                      <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                        <img
                          className="show-img"
                          src={event.imageUrl ?? '/placeholder-event.jpg'}
                          alt={event.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            px: 1.5,
                            py: 0.5,
                            bgcolor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: 2,
                            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                          }}
                        >
                          <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
                            {new Date(event.eventDate).toLocaleDateString('vi-VN')}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ p: 2.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1, fontFamily: '"Outfit", "Inter", sans-serif' }}>
                          {event.title}
                        </Typography>
                        <Stack spacing={0.5}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <LocationOnIcon sx={{ fontSize: '0.9rem', color: 'primary.main' }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {event.venue}
                            </Typography>
                          </Stack>
                          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6, ml: 3 }}>
                            {event.city}
                          </Typography>
                        </Stack>
                      </Box>
                    </Paper>
                  </Grid>
                ))
            ) : (
              <Grid item xs={12}>
                <Typography sx={{ color: 'text.secondary', opacity: 0.5, textAlign: 'center', py: 5 }}>
                  Chưa có thông tin show diễn cũ.
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
