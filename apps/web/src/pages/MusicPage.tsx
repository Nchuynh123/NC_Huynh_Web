import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { keyframes } from '@mui/system';
import { fetchAlbums, fetchSettings } from '../api/client';
import { AlbumCard } from '../components/AlbumCard';

const SpotifyIcon = (props: any) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginRight: props.style?.marginRight }} {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.076-.67-.135-.746-.472-.076-.336.135-.67.472-.746 3.847-.878 7.14-.5 9.822 1.14.295.18.387.565.207.863zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.156-10.075-1.184-.412.125-.845-.107-.97-.52-.125-.413.108-.847.52-.97 3.666-1.112 8.232-.57 11.34 1.343.366.226.486.707.26 1.07zm.105-2.83c-3.26-1.937-8.634-2.115-11.75-1.17-.5.152-1.025-.133-1.176-.633-.15-.5.133-1.025.633-1.176 3.616-1.097 9.54-.89 13.3 1.344.45.267.6.845.333 1.295-.267.45-.845.6-1.295.333-.002 0-.002 0 0 0z" />
  </svg>
);

const AppleMusicIcon = (props: any) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginRight: props.style?.marginRight }} {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1.002 12.838c0 1.292-.78 1.956-1.986 1.956-1.186 0-1.848-.686-1.848-1.748 0-1.118.826-1.8 2.21-1.8h1.624v1.592zm0-2.454h-1.624c-2.072 0-3.328 1.076-3.328 2.766 0 1.636 1.042 2.656 2.87 2.656 1.83 0 2.852-1.048 3.12-2.186h.052v1.94h1.008v-5.176c0-2.146-1.396-3.08-3.666-3.08-1.96 0-3.238.878-3.418 2.204h1.008c.188-.8.95-1.316 2.378-1.316 1.488 0 2.28.666 2.28 1.906v1.086zm0-1.854V9.664h.02c-.222-.846-.998-1.368-2.186-1.368-1.742 0-2.732 1.048-2.732 2.668 0 1.62 1.018 2.666 2.724 2.666 1.218 0 2.016-.54 2.186-1.378h.02V10.53z" />
  </svg>
);

const YouTubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginRight: props.style?.marginRight }} {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const getSpotifyEmbedUrl = (spotifyUrl?: string) => {
  if (!spotifyUrl) return 'https://open.spotify.com/embed/artist/4BhKugGyGZ4PZKdsr5TvSA';
  if (spotifyUrl.includes('/embed/')) return spotifyUrl;
  if (spotifyUrl.includes('open.spotify.com/')) {
    return spotifyUrl.replace('open.spotify.com/', 'open.spotify.com/embed/');
  }
  if (spotifyUrl.startsWith('spotify:')) {
    const parts = spotifyUrl.split(':');
    if (parts.length >= 3) {
      return `https://open.spotify.com/embed/${parts[1]}/${parts[2]}`;
    }
  }
  return spotifyUrl;
};

const getAppleMusicEmbedUrl = (appleMusicUrl?: string) => {
  const fallback = 'https://embed.music.apple.com/us/artist/nc-huynh/1767411504';
  if (!appleMusicUrl) return fallback;
  if (appleMusicUrl.includes('embed.music.apple.com')) return appleMusicUrl;
  return appleMusicUrl.replace('music.apple.com', 'embed.music.apple.com');
};

const getYouTubeEmbedUrl = (youtubeUrl?: string) => {
  const fallback = 'https://www.youtube.com/embed/qqiZNIqWGDU';
  if (!youtubeUrl) return fallback;
  if (youtubeUrl.includes('/embed/')) return youtubeUrl;

  if (youtubeUrl.includes('list=')) {
    const listId = new URL(youtubeUrl).searchParams.get('list');
    return `https://www.youtube.com/embed/videoseries?list=${listId}`;
  }
  if (youtubeUrl.includes('watch?v=')) {
    const videoId = new URL(youtubeUrl).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (youtubeUrl.includes('youtu.be/')) {
    const videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (youtubeUrl.includes('@') || youtubeUrl.includes('channel') || youtubeUrl.includes('user')) {
    return 'https://www.youtube.com/embed/qqiZNIqWGDU';
  }
  return fallback;
};

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(4deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

type Platform = 'spotify' | 'apple' | 'youtube';

export function MusicPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: albums, isLoading } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
  const [platform, setPlatform] = useState<Platform>('spotify');

  // Links setup
  const rawSpotifyUrl = (settings?.socialLinks as any)?.spotify || 'https://open.spotify.com/artist/4BhKugGyGZ4PZKdsr5TvSA';
  const spotifyEmbedUrl = getSpotifyEmbedUrl(rawSpotifyUrl);

  const rawAppleMusicUrl = (settings?.socialLinks as any)?.appleMusic || 'https://music.apple.com/us/artist/nc-huynh/1767411504';
  const appleMusicEmbedUrl = getAppleMusicEmbedUrl(rawAppleMusicUrl);

  const rawYouTubeUrl = (settings?.socialLinks as any)?.youtube || 'https://www.youtube.com/@nchuynh0812';
  const youtubeEmbedUrl = getYouTubeEmbedUrl(rawYouTubeUrl);

  const brandColors: Record<Platform, string> = {
    spotify: '#1DB954',
    apple: '#FC3C44',
    youtube: '#FF0000',
  };

  const brandColorsRgb: Record<Platform, string> = {
    spotify: '29,185,84',
    apple: '252,60,68',
    youtube: '255,0,0',
  };

  const activeColor = brandColors[platform];
  const activeColorRgb = brandColorsRgb[platform];

  const getEmbedUrl = () => {
    switch (platform) {
      case 'apple': return appleMusicEmbedUrl;
      case 'youtube': return youtubeEmbedUrl;
      case 'spotify':
      default:
        return spotifyEmbedUrl;
    }
  };

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

        {/* Platform Selection Tabs */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          {(['spotify', 'youtube'] as Platform[]).map((p) => {
            const active = platform === p;
            const label = p === 'spotify' ? 'Spotify' : 'YouTube Music';
            const icon = p === 'spotify' ? <SpotifyIcon /> : <YouTubeIcon />;
            const brandColor = brandColors[p];

            return (
              <Button
                key={p}
                onClick={() => setPlatform(p)}
                variant={active ? 'contained' : 'outlined'}
                startIcon={icon}
                sx={{
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  fontWeight: 800,
                  textTransform: 'none',
                  fontSize: '0.85rem',
                  color: active ? 'white' : 'text.secondary',
                  bgcolor: active ? brandColor : 'transparent',
                  borderColor: active ? brandColor : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: active ? `0 8px 20px rgba(${brandColorsRgb[p]}, 0.35)` : 'none',
                  '&:hover': {
                    bgcolor: active ? brandColor : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    borderColor: active ? brandColor : brandColor,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {label}
              </Button>
            );
          })}
        </Stack>

        {/* Multi-platform Artist Card */}
        <Paper
          elevation={0}
          sx={{
            maxWidth: 720,
            width: '100%',
            height: { xs: 380, sm: 420 },
            mx: 'auto',
            borderRadius: 6,
            mb: 8,
            background: isDark
              ? `linear-gradient(135deg, rgba(${activeColorRgb},0.04) 0%, rgba(0,0,0,0.6) 100%)`
              : `linear-gradient(135deg, rgba(${activeColorRgb},0.03) 0%, rgba(255,255,255,0.8) 100%)`,
            backdropFilter: 'blur(35px)',
            WebkitBackdropFilter: 'blur(35px)',
            border: `1px solid rgba(${activeColorRgb},0.15)`,
            boxShadow: isDark
              ? `0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(${activeColorRgb},0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
              : `0 20px 60px rgba(${activeColorRgb},0.05)`,
            overflow: 'hidden',
            position: 'relative',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: isDark 
                ? `0 40px 90px rgba(0,0,0,0.7), 0 0 60px rgba(${activeColorRgb},0.2)`
                : `0 25px 70px rgba(${activeColorRgb},0.08)`,
            }
          }}
        >
          {/* Decorative Floating Icon Background */}
          <Box
            key={platform}
            sx={{
              position: 'absolute',
              bottom: '-12%',
              left: '-8%',
              width: 220,
              height: 220,
              opacity: isDark ? 0.04 : 0.02,
              color: activeColor,
              animation: `${floatAnimation} 12s infinite ease-in-out`,
              pointerEvents: 'none',
              zIndex: 0,
              transition: 'color 0.5s ease'
            }}
          >
            {platform === 'spotify' ? (
              <SpotifyIcon style={{ width: '100%', height: '100%' }} />
            ) : platform === 'apple' ? (
              <AppleMusicIcon style={{ width: '100%', height: '100%' }} />
            ) : (
              <YouTubeIcon style={{ width: '100%', height: '100%' }} />
            )}
          </Box>

          {/* Decorative Glowing Mesh */}
          <Box
            sx={{
              position: 'absolute',
              top: '-30%',
              right: '-15%',
              width: 300,
              height: 300,
              background: `radial-gradient(circle, rgba(${activeColorRgb},0.2) 0%, transparent 75%)`,
              filter: 'blur(50px)',
              pointerEvents: 'none',
              zIndex: 0,
              transition: 'background 0.5s ease'
            }}
          />

          {/* Clean centered Iframe */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              p: 0
            }}
          >
            <iframe
              key={platform}
              style={{ borderRadius: '24px', border: 0 }}
              src={`${getEmbedUrl()}${platform === 'spotify' ? `?utm_source=generator&theme=${isDark ? '0' : '1'}` : ''}`}
              width="100%"
              height="100%"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </Box>
        </Paper>

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
