import { Box, Container, Grid, Skeleton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AlbumCard } from './AlbumCard';
import type { Album } from '@band/shared';
import { useTheme } from '@mui/material/styles';

interface FeaturedMusicSectionProps {
  albums: Album[];
  isLoading: boolean;
}

export function FeaturedMusicSection({ albums, isLoading }: FeaturedMusicSectionProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const featured = albums.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)' }}>
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
              px: 4,
              py: 1.2,
              fontWeight: 800,
              textTransform: 'none',
              fontSize: '0.9rem',
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
  );
}
