import { Box, Button, Container, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums, fetchSettings } from '../api/client';
import { HeroSection } from '../components/HeroSection';
import { AlbumCard } from '../components/AlbumCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function HomePage() {
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
  const { data: albums, isLoading } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });

  const featured = albums?.slice(0, 3) ?? [];

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <HeroSection settings={settings} />

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 }, position: 'relative' }}>
        {/* Decorative Glow */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: '40%',
            height: '40%',
            bgcolor: 'primary.main',
            filter: 'blur(150px)',
            opacity: isDark ? 0.05 : 0.03,
            zIndex: 0
          }}
        />

        <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid item xs={12} md={7}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.4em', mb: 1, display: 'block' }}
            >
              OUR STORY
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontFamily: '"Outfit", "Inter", sans-serif',
                color: 'text.primary',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: isDark
                  ? 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.4) 100%)'
                  : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Giới thiệu <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.9,
                fontSize: '1.15rem',
                fontFamily: '"Inter", sans-serif',
                mb: 4,
                fontWeight: 400
              }}
            >
              {settings?.about?.slice(0, 350) ?? 'Đang tải câu chuyện của chúng mình...'}
              {(settings?.about?.length ?? 0) > 350 && '...'}
            </Typography>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                color: 'text.primary',
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(255,45,85,0.05)',
                  transform: 'translateX(5px)'
                }
              }}
            >
              Câu chuyện của chúng mình
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Music Section */}
      <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.4em', mb: 1, display: 'block' }}
            >
              DISCOGRAPHY
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
              Âm nhạc nổi bật <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {isLoading
              ? [0, 1, 2].map((i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <Skeleton variant="rounded" height={350} sx={{ borderRadius: 6, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
                </Grid>
              ))
              : featured.map((album) => (
                <Grid key={album.id} item xs={12} sm={6} md={4}>
                  <AlbumCard album={album} />
                </Grid>
              ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              component={Link}
              to="/music"
              variant="contained"
              sx={{
                borderRadius: '50px',
                px: 6,
                py: 2,
                fontWeight: 800,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: isDark ? '0 10px 30px rgba(255,45,85,0.3)' : '0 10px 30px rgba(255,45,85,0.2)',
                '&:hover': {
                  boxShadow: isDark ? '0 15px 40px rgba(255,45,85,0.5)' : '0 15px 40px rgba(255,45,85,0.3)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Khám phá tất cả sản phẩm
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
