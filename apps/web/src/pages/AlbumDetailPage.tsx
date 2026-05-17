import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbum } from '../api/client';
import { TrackList } from '../components/TrackList';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

export function AlbumDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { slug } = useParams<{ slug: string }>();
  const { data: album, isLoading, isError } = useQuery({
    queryKey: ['album', slug],
    queryFn: () => fetchAlbum(slug!),
    enabled: !!slug,
  });

  if (isError) {
    return (
      <Container sx={{ pt: 12 }}>
        <Typography sx={{ color: 'text.primary' }}>Album không tìm thấy.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Container maxWidth="lg" sx={{ mt: 2, position: 'relative', zIndex: 2 }}>
        <IconButton
          component={Link}
          to="/music"
          sx={{
            mb: 1,
            color: 'text.secondary',
            opacity: 0.5,
            transition: 'all 0.2s',
            '&:hover': { color: 'primary.main', transform: 'translateX(-5px)', opacity: 1 }
          }}
        >
          <ArrowBackIcon sx={{ fontSize: '1.2rem' }} />
        </IconButton>

        {isLoading ? (
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rounded" height={350} sx={{ borderRadius: 5, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Skeleton variant="text" width="60%" height={50} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
              <Skeleton variant="rounded" height={150} sx={{ bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
            </Grid>
          </Grid>
        ) : (
          album && (
            <Grid container spacing={5} alignItems="flex-start">
              {/* Left Column: Image */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 5,
                    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                    boxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.6)' : '0 20px 60px rgba(0,0,0,0.08)',
                  }}
                >
                  <Box
                    component="img"
                    src={album.coverUrl ?? '/placeholder-album.jpg'}
                    alt={album.title}
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover',
                      borderRadius: 4,
                      display: 'block',
                    }}
                  />
                </Paper>
              </Grid>

              {/* Right Column: Info & Tracks */}
              <Grid item xs={12} md={8}>
                <Box sx={{ pl: { md: 1 } }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 800,
                      letterSpacing: '0.3em',
                      display: 'block',
                      mb: 0.5,
                      fontSize: '0.65rem'
                    }}
                  >
                    {album.type} RELEASE
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      fontFamily: '"Outfit", "Inter", sans-serif',
                      color: 'text.primary',
                      background: isDark
                        ? 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.5) 100%)'
                        : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.5) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                      mb: 2,
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {album.title}
                  </Typography>

                  <Stack direction="row" spacing={4} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarMonthIcon sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1, opacity: 0.8 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, display: 'block', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.6rem' }}>
                          Năm
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                          {album.releaseDate ? new Date(album.releaseDate).getFullYear() : '—'}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <QueueMusicIcon sx={{ color: 'primary.main', fontSize: '1.2rem', mr: 1, opacity: 0.8 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, display: 'block', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.6rem' }}>
                          Sản phẩm
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                          {album.type === 'SINGLE' ? '1 bài hát' : `${album.tracks?.length ?? 0} bài hát`}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  {album.type === 'SINGLE' ? (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3.5,
                        borderRadius: 4,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                        border: '1px dashed',
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        mt: 4
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 800,
                          fontFamily: '"Outfit", "Inter", sans-serif',
                          color: 'text.primary',
                          mb: 1.5
                        }}
                      >
                        Thưởng thức đĩa đơn này
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          mb: 4,
                          fontFamily: '"Inter", sans-serif'
                        }}
                      >
                        {album.description || 'Đĩa đơn chính thức đầy cảm xúc từ NC Huynh. Lắng nghe trọn vẹn giai điệu và ca từ của tác phẩm trên các nền tảng phát nhạc trực tuyến.'}
                      </Typography>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        {album.spotifyUrl && (
                          <Button
                            href={album.spotifyUrl}
                            target="_blank"
                            rel="noopener"
                            variant="contained"
                            size="large"
                            startIcon={<PlayArrowIcon />}
                            sx={{
                              borderRadius: '12px',
                              px: 4,
                              py: 1.8,
                              fontWeight: 800,
                              textTransform: 'none',
                              bgcolor: '#1DB954',
                              boxShadow: '0 8px 25px rgba(29, 185, 84, 0.25)',
                              '&:hover': { bgcolor: '#1ed760', boxShadow: '0 12px 30px rgba(29, 185, 84, 0.4)' }
                            }}
                          >
                            Nghe trên Spotify
                          </Button>
                        )}
                        {album.youtubeUrl && (
                          <Button
                            href={album.youtubeUrl}
                            target="_blank"
                            rel="noopener"
                            variant="outlined"
                            size="large"
                            startIcon={<YouTubeIcon />}
                            sx={{
                              borderRadius: '12px',
                              px: 4,
                              py: 1.8,
                              fontWeight: 800,
                              textTransform: 'none',
                              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                              color: 'text.primary',
                              '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(255,45,85,0.05)' }
                            }}
                          >
                            Xem trên YouTube
                          </Button>
                        )}
                      </Stack>
                    </Paper>
                  ) : (
                    <>
                      <Box sx={{ mb: 4 }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: '"Outfit", "Inter", sans-serif', color: 'text.primary' }}>
                            Danh sách bài hát
                          </Typography>
                          <Divider sx={{ flexGrow: 1, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }} />
                        </Stack>
                        <Box sx={{
                          maxHeight: 300,
                          overflowY: 'auto',
                          pr: 1,
                          '&::-webkit-scrollbar': { width: '4px' },
                          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                          '&::-webkit-scrollbar-thumb': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', borderRadius: 2 }
                        }}>
                          <TrackList tracks={album.tracks ?? []} albumTitle={album.title} albumType={album.type} />
                        </Box>
                      </Box>

                      <Stack direction="row" spacing={2}>
                        {album.spotifyUrl && (
                          <Button
                            href={album.spotifyUrl}
                            target="_blank"
                            rel="noopener"
                            variant="contained"
                            size="large"
                            startIcon={<PlayArrowIcon />}
                            sx={{
                              borderRadius: '12px',
                              px: 4,
                              py: 1.5,
                              fontWeight: 700,
                              textTransform: 'none',
                              bgcolor: '#1DB954',
                              boxShadow: '0 8px 20px rgba(29, 185, 84, 0.3)',
                              '&:hover': { bgcolor: '#1ed760', boxShadow: '0 10px 25px rgba(29, 185, 84, 0.4)' }
                            }}
                          >
                            Nghe trên Spotify
                          </Button>
                        )}
                        {album.youtubeUrl && (
                          <Button
                            href={album.youtubeUrl}
                            target="_blank"
                            rel="noopener"
                            variant="outlined"
                            size="large"
                            startIcon={<YouTubeIcon />}
                            sx={{
                              borderRadius: '12px',
                              px: 4,
                              py: 1.5,
                              fontWeight: 700,
                              textTransform: 'none',
                              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                              color: 'text.primary',
                              '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(255,45,85,0.05)' }
                            }}
                          >
                            Xem trên YouTube
                          </Button>
                        )}
                      </Stack>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          )
        )}
      </Container>
    </Box>
  );
}
