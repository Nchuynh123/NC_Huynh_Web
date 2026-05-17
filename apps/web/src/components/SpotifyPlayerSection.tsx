import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { keyframes } from '@mui/system';
import { fetchSettings } from '../api/client';

const SpotifyIcon = (props: any) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginRight: props.style?.marginRight }} {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.894-.982-.336.076-.67-.135-.746-.472-.076-.336.135-.67.472-.746 3.847-.878 7.14-.5 9.822 1.14.295.18.387.565.207.863zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.156-10.075-1.184-.412.125-.845-.107-.97-.52-.125-.413.108-.847.52-.97 3.666-1.112 8.232-.57 11.34 1.343.366.226.486.707.26 1.07zm.105-2.83c-3.26-1.937-8.634-2.115-11.75-1.17-.5.152-1.025-.133-1.176-.633-.15-.5.133-1.025.633-1.176 3.616-1.097 9.54-.89 13.3 1.344.45.267.6.845.333 1.295-.267.45-.845.6-1.295.333-.002 0-.002 0 0 0z" />
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

const spotifyGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(29, 185, 84, 0); }
  100% { box-shadow: 0 0 0 0 rgba(29, 185, 84, 0); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(4deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const barBounce = keyframes`
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
`;

const buttonShine = keyframes`
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
`;

export function SpotifyPlayerSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });

  // Get artist spotify links
  const rawSpotifyUrl = (settings?.socialLinks as any)?.spotify || 'https://open.spotify.com/artist/4BhKugGyGZ4PZKdsr5TvSA';
  const spotifyArtistUrl = rawSpotifyUrl;
  const spotifyEmbedUrl = getSpotifyEmbedUrl(rawSpotifyUrl);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, position: 'relative', zIndex: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 8,
          background: isDark
            ? 'linear-gradient(135deg, rgba(29,185,84,0.04) 0%, rgba(0,0,0,0.6) 100%)'
            : 'linear-gradient(135deg, rgba(29,185,84,0.03) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          border: isDark
            ? '1px solid rgba(29,185,84,0.15)'
            : '1px solid rgba(29,185,84,0.12)',
          boxShadow: isDark
            ? '0 30px 80px rgba(0,0,0,0.6), 0 0 50px rgba(29,185,84,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 20px 60px rgba(29,185,84,0.05)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Decorative Floating Icon Background */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '-8%',
            left: '-5%',
            width: 260,
            height: 260,
            opacity: isDark ? 0.05 : 0.03,
            color: '#1DB954',
            animation: `${floatAnimation} 10s infinite ease-in-out`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <SpotifyIcon style={{ width: '100%', height: '100%' }} />
        </Box>

        {/* Decorative Glowing Mesh */}
        <Box
          sx={{
            position: 'absolute',
            top: '-30%',
            right: '-15%',
            width: 350,
            height: 350,
            background: 'radial-gradient(circle, rgba(29,185,84,0.2) 0%, transparent 75%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <Grid container spacing={5} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Promo Info */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3.5}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: '#1DB954',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 8px 24px rgba(29,185,84,0.4)',
                    animation: `${spotifyGlow} 2.5s infinite ease-in-out`,
                  }}
                >
                  <SpotifyIcon />
                </Box>
                <Stack spacing={0.5}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 900,
                      fontFamily: '"Outfit", "Inter", sans-serif',
                      color: '#1DB954',
                      letterSpacing: '0.15em',
                      lineHeight: 1
                    }}
                  >
                    SPOTIFY PLAYER
                  </Typography>
                  
                  {/* Tiny Jumping Music Visualizer */}
                  <Stack direction="row" spacing={0.4} alignItems="flex-end" sx={{ height: 10 }}>
                    {[0.5, 0.2, 0.7, 0.4].map((delay, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 2.5,
                          height: '100%',
                          bgcolor: '#1DB954',
                          borderRadius: 0.3,
                          transformOrigin: 'bottom',
                          animation: `${barBounce} 1s infinite ease-in-out`,
                          animationDelay: `${delay}s`,
                          opacity: 0.8
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  fontFamily: '"Outfit", "Inter", sans-serif',
                  lineHeight: 1.1,
                  background: isDark
                    ? 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.7) 100%)'
                    : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.4rem' },
                  letterSpacing: '-0.02em'
                }}
              >
                Nghe nhạc trực tuyến trên Spotify
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontSize: '1rem',
                  fontFamily: '"Inter", sans-serif',
                  opacity: 0.9
                }}
              >
                Thưởng thức các ca khúc hit, danh sách phát và các sản phẩm âm nhạc chất lượng cao của chúng tôi trực tiếp từ Spotify. Đừng quên bấm nút **Follow** để cập nhật nhanh nhất các sáng tác mới!
              </Typography>

              <Button
                href={spotifyArtistUrl}
                target="_blank"
                rel="noopener"
                variant="contained"
                startIcon={<SpotifyIcon />}
                sx={{
                  bgcolor: '#1DB954',
                  color: 'white',
                  fontWeight: 800,
                  borderRadius: '50px',
                  px: 4.5,
                  py: 1.8,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  boxShadow: '0 8px 30px rgba(29,185,84,0.4)',
                  alignSelf: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    bgcolor: '#1ed760',
                    boxShadow: '0 15px 35px rgba(29,185,84,0.6)',
                    transform: 'translateY(-3px)'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)',
                    transform: 'skewX(-25deg)',
                    animation: `${buttonShine} 3s infinite ease-in-out`
                  }
                }}
              >
                Mở trong ứng dụng Spotify
              </Button>
            </Stack>
          </Grid>

          {/* Spotify Player Embed */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                borderRadius: '24px',
                overflow: 'hidden',
                bgcolor: 'rgba(0,0,0,0.3)',
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                height: { xs: 350, sm: 380 },
                width: '100%',
                display: 'flex',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                }
              }}
            >
              <iframe
                style={{ borderRadius: '24px', border: 0 }}
                src={`${spotifyEmbedUrl}?utm_source=generator&theme=${isDark ? '0' : '1'}`}
                width="100%"
                height="100%"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
