import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';
import type { Album } from '@band/shared';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '../api/client';

export function AlbumCard({ album }: { album: Album }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        position: 'relative',
        boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,1)',
          borderColor: 'primary.main',
          boxShadow: isDark
            ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,45,85,0.1)'
            : '0 20px 40px rgba(0,0,0,0.08), 0 0 20px rgba(255,45,85,0.05)',
          '& .album-img': {
            transform: 'scale(1.1)',
          },
          '& .album-overlay': {
            opacity: 1,
          }
        }
      }}
    >
      <CardActionArea component={Link} to={`/music/${album.slug}`} sx={{ height: '100%' }}>
        {/* Cover Image Section */}
        <Box sx={{ height: 280, overflow: 'hidden', position: 'relative' }}>
          <Box
            className="album-img"
            sx={{
              width: '100%',
              height: '100%',
              bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              backgroundImage: album.coverUrl ? `url(${album.coverUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!album.coverUrl && (
              <Typography variant="h3" sx={{ opacity: 0.2, color: 'text.primary' }}>
                ♪
              </Typography>
            )}
          </Box>

          <Box
            className="album-overlay"
            sx={{
              position: 'absolute',
              inset: 0,
              background: isDark
                ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'
                : 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)',
              opacity: 0.8,
              transition: 'opacity 0.3s ease'
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 15,
              right: 15,
            }}
          >
            <Chip
              label={album.type}
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.65rem',
                height: 24,
                borderRadius: '6px',
                backdropFilter: 'blur(10px)',
                boxShadow: isDark ? '0 4px 10px rgba(255,45,85,0.3)' : '0 4px 10px rgba(255,45,85,0.2)'
              }}
            />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                fontFamily: '"Outfit", "Inter", sans-serif',
                color: 'white',
                mb: 0.5,
                lineHeight: 1.2,
                textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 1px 5px rgba(0,0,0,0.3)'
              }}
            >
              {album.title}
            </Typography>
            {album.releaseDate && (
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 600,
                  letterSpacing: '0.1em'
                }}
              >
                {new Date(album.releaseDate).getFullYear()}
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Paper>
  );
}

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

export function SpotifyPromoCard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });

  const rawSpotifyUrl = (settings?.socialLinks as any)?.spotify || 'https://open.spotify.com/artist/4BhKugGyGZ4PZKdsr5TvSA';
  const spotifyEmbedUrl = getSpotifyEmbedUrl(rawSpotifyUrl);

  return (
    <Paper
      elevation={0}
      sx={{
        height: 280,
        borderRadius: 5,
        overflow: 'hidden',
        bgcolor: 'rgba(0,0,0,0.3)',
        border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: isDark
          ? '0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 10px 30px rgba(0,0,0,0.03)',
        transition: 'all 0.3s ease',
        position: 'relative',
        display: 'flex',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0,0,0,0.08)'
        }
      }}
    >
      <iframe
        style={{ borderRadius: '20px', border: 0 }}
        src={`${spotifyEmbedUrl}?utm_source=generator&theme=${isDark ? '0' : '1'}`}
        width="100%"
        height="100%"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </Paper>
  );
}
