import { Box, Button, Container, Stack, Typography, keyframes, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchAlbums } from '../api/client';
import type { SiteSettings } from '@band/shared';

const scroll = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;

const pulse = keyframes`
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0.4; transform: scale(1); }
`;

const drawText = (isDark: boolean) => keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(20px) rotateX(-90deg);
    filter: blur(10px);
    -webkit-text-stroke: 1px ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'};
    color: transparent;
  }
  20% { 
    opacity: 1; 
    transform: translateY(0) rotateX(0);
    filter: blur(0);
    -webkit-text-stroke: 1px ${isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)'};
    color: transparent;
  }
  50% {
    -webkit-text-stroke: 1px #ff2d55;
    color: rgba(255,45,85,0.1);
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) rotateX(0);
    filter: blur(0);
    -webkit-text-stroke: 0px transparent;
    color: ${isDark ? 'white' : '#121212'};
  }
`;

interface HeroSectionProps {
  settings?: SiteSettings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const heroUrl = settings?.heroImageUrl;
  const { data: albums } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });

  // Map all tracks and include parent album info
  const allTracks = albums?.flatMap(album =>
    (album.tracks || []).map(track => ({
      ...track,
      albumTitle: album.title,
      albumType: album.type,
      albumSlug: album.slug
    }))
  ) || [];

  // Duplicate for seamless loop if enough tracks
  const displayTracks = allTracks.length > 0 ? [...allTracks, ...allTracks] : [];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 500, md: 750 },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundImage: heroUrl
          ? (isDark 
              ? `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.9) 100%), url(${heroUrl})`
              : `linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.85) 100%), url(${heroUrl})`)
          : (isDark 
              ? 'linear-gradient(135deg, #1a0a0a 0%, #0a0a0a 50%, #1a1208 100%)'
              : 'linear-gradient(135deg, #fdfdfd 0%, #f5f5f5 50%, #fafafa 100%)'),
        backgroundSize: 'cover',
        backgroundPosition: 'center 15%',
      }}
    >
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="space-between">
          <Stack spacing={2} maxWidth={600} sx={{ zIndex: 2 }}>
            <Typography
              variant="h1"
              component="div"
              sx={{
                fontSize: { xs: '2.8rem', md: '5rem' },
                lineHeight: 1.1,
                fontWeight: 900,
                fontFamily: '"Outfit", "Inter", sans-serif',
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 1, md: 0 },
              }}
            >
              {(settings?.bandName ?? 'NC Huynh').split('').map((char, i) => (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    display: 'inline-block',
                    animation: `${drawText(isDark)} 3s infinite alternate`,
                    animationDelay: `${i * 0.15}s`,
                    minWidth: char === ' ' ? '1rem' : 'auto',
                    position: 'relative',
                    textShadow: isDark ? '0 0 20px rgba(255,45,85,0.2)' : 'none',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </Box>
              ))}
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 500, fontWeight: 500, display: { xs: 'none', md: 'block' } }}>
              {settings?.tagline ?? 'NC Huynh những người chơi nhạc đến từ Quảng Ngãi'}
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: { xs: 2, md: 4 } }}>
              <Button
                component={Link}
                to="/about"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 5,
                  bgcolor: 'primary.main',
                  fontSize: '1rem',
                  fontWeight: 600,
                  px: 4,
                  boxShadow: '0 8px 20px rgba(230, 57, 70, 0.3)',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 12px 25px rgba(230, 57, 70, 0.4)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Giới Thiệu
              </Button>
              <Button
                component={Link}
                to="/music"
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 5,
                  color: 'text.primary',
                  borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)',
                  backdropFilter: 'blur(8px)',
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Âm nhạc
              </Button>
            </Stack>
          </Stack>

          {/* Animated Track List */}
          {!isMobile && displayTracks.length > 0 && (
            <Box
              sx={{
                width: 320,
                height: 400,
                position: 'relative',
                overflow: 'hidden',
                maskImage: 'linear-gradient(transparent, black 15%, black 85%, transparent)',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  animation: `${scroll} ${displayTracks.length * 3}s linear infinite`,
                  '&:hover': { animationPlayState: 'paused' },
                }}
              >
                {displayTracks.map((track, i) => (
                  <Box
                    key={`${track.id}-${i}`}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                      backdropFilter: 'blur(16px)',
                      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.03)',
                      '&:hover': {
                        bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,1)',
                        borderColor: 'primary.main',
                        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.08)',
                        '& .track-arrow': { transform: 'translateX(3px)', color: 'primary.main' }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                      }}
                    >
                      <MusicNoteIcon sx={{ color: 'primary.main', fontSize: '1.1rem', animation: `${pulse} 2s infinite ease-in-out` }} />
                    </Box>

                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 700,
                          lineHeight: 1.2,
                          fontFamily: '"Outfit", "Inter", sans-serif',
                          letterSpacing: '0.01em'
                        }}
                        noWrap
                      >
                        {track.title}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            fontSize: '0.6rem',
                            letterSpacing: '0.05em',
                            px: 0.6,
                            py: 0.1,
                            bgcolor: 'rgba(255, 45, 85, 0.1)',
                            borderRadius: 0.5
                          }}
                        >
                          {track.albumType}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem', fontWeight: 500, opacity: 0.7 }} noWrap>
                          {track.albumTitle}
                        </Typography>
                      </Stack>
                    </Box>
                    <IconButton
                      className="track-arrow"
                      component={Link}
                      to={`/music/${track.albumSlug}`}
                      size="small"
                      sx={{
                        color: 'text.secondary',
                        opacity: 0.3,
                        transition: 'all 0.3s'
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: '0.7rem' }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </Container>

      {/* Decorative Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
