import { Container, Grid, Skeleton, Box, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums } from '../api/client';
import { AlbumCard } from '../components/AlbumCard';

export function MusicPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: albums, isLoading } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });

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
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2,
              letterSpacing: '-0.02em'
            }}
          >
            Âm nhạc <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
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
            Khám phá những Album, EP và Single - nơi lưu giữ hành trình cảm xúc của NC Huynh qua từng nốt nhạc.
          </Typography>
        </Box>

        {/* Albums Grid */}
        <Grid container spacing={4}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Grid key={i} item xs={12} sm={6} md={4}>
                  <Skeleton 
                    variant="rounded" 
                    height={280} 
                    sx={{ 
                      bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', 
                      borderRadius: 5 
                    }} 
                  />
                </Grid>
              ))
            : albums?.map((album) => (
                <Grid key={album.id} item xs={12} sm={6} md={4}>
                  <AlbumCard album={album} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
}
