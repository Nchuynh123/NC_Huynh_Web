import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { Track } from '@band/shared';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';

interface TrackListProps {
  tracks: Track[];
  albumTitle?: string;
  albumType?: string;
}

export function TrackList({ tracks, albumTitle, albumType }: TrackListProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!tracks.length) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
          borderRadius: 4,
          border: isDark ? '1px dashed rgba(255,255,255,0.08)' : '1px dashed rgba(0,0,0,0.06)'
        }}
      >
        <Typography sx={{ color: 'text.secondary', opacity: 0.5, fontSize: '0.9rem', fontFamily: '"Inter", sans-serif' }}>
          Chưa có tracklist cho sản phẩm này.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.5}>
      {tracks.map((t) => (
        <Box
          key={t.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 1.5,
            px: 2,
            borderRadius: '16px',
            bgcolor: 'transparent',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            boxShadow: isDark ? '0 4px 30px rgba(0,0,0,0.2)' : '0 4px 30px rgba(0,0,0,0.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            '@keyframes glassShine': {
              '0%': { left: '-150%' },
              '30%': { left: '-150%' },
              '70%': { left: '150%' },
              '100%': { left: '150%' }
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-150%',
              width: '150%',
              height: '100%',
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.22), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4), transparent)',
              transform: 'skewX(-25deg)',
              zIndex: 9,
              pointerEvents: 'none',
              animation: 'glassShine 6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
              animationDelay: `${(tracks.indexOf(t) % 4) * 1.5}s`,
            },
            '&:hover': {
              bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.15)',
              borderColor: 'primary.main',
              transform: 'translateY(-2px)',
              boxShadow: isDark
                ? '0 12px 30px rgba(255,45,85,0.15)'
                : '0 12px 30px rgba(255,45,85,0.08)',
              '& .track-icon-box': {
                bgcolor: 'primary.main',
                '& .track-icon': {
                  color: 'white',
                  transform: 'scale(1.1)'
                }
              },
              '& .track-chevron': {
                color: 'primary.main',
                transform: 'translateX(3px)'
              }
            }
          }}
        >
          {/* Left Side: Icon in beautiful Glass Box */}
          <Box
            className="track-icon-box"
            sx={{
              width: 44,
              height: 44,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'transparent',
              border: '1px solid',
              borderColor: 'transparent',
              mr: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <MusicNoteIcon
              className="track-icon"
              sx={{
                fontSize: '1.2rem',
                color: 'primary.main',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </Box>

          {/* Center: Title & Album/EP Badge */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                fontFamily: '"Outfit", "Inter", sans-serif',
                fontSize: '0.98rem',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}
            >
              {t.title}
            </Typography>

            {/* Premium Pink/Red Badge */}
            {(albumType || albumTitle) && (
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  bgcolor: isDark ? 'rgba(255,45,85,0.1)' : 'rgba(255,45,85,0.05)',
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,45,85,0.2)' : 'rgba(255,45,85,0.1)',
                  borderRadius: '4px',
                  px: 0.8,
                  py: 0.2,
                  mt: 0.6
                }}
              >
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    fontFamily: '"Outfit", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {albumType} {albumTitle && `• ${albumTitle}`}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Side: Chevron & Duration */}
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: 1 }}>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                opacity: 0.6,
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {t.duration ?? '--:--'}
            </Typography>
            <ChevronRightIcon
              className="track-chevron"
              sx={{
                fontSize: '1.1rem',
                color: 'text.secondary',
                opacity: 0.4,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
