import { Box, Typography, Stack } from '@mui/material';
import type { Track } from '@band/shared';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export function TrackList({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.02)', borderRadius: 3, border: '1px dashed rgba(255,255,255,0.1)' }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.3)' }}>Chưa có tracklist cho sản phẩm này.</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={0.8}>
      {tracks.map((t) => (
        <Box
          key={t.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 0.8,
            px: 1.5,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.03)',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.1)',
              transform: 'translateX(6px)',
              '& .track-no': { opacity: 0 },
              '& .track-play': { opacity: 1, transform: 'scale(1)' },
              '& .track-title': { color: 'white' }
            }
          }}
        >
          <Box sx={{ width: 32, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Typography
              className="track-no"
              sx={{
                color: 'rgba(255,255,255,0.2)',
                fontWeight: 800,
                fontFamily: '"Outfit", sans-serif',
                fontSize: '0.8rem',
                transition: 'all 0.2s'
              }}
            >
              {String(t.trackNo).padStart(2, '0')}
            </Typography>
            <PlayArrowIcon 
              className="track-play"
              sx={{ 
                position: 'absolute',
                left: -4,
                fontSize: '1.2rem',
                color: 'primary.main',
                opacity: 0,
                transform: 'scale(0.5)',
                transition: 'all 0.2s'
              }} 
            />
          </Box>
          
          <MusicNoteIcon sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.15)', mr: 1.5 }} />

          <Typography
            className="track-title"
            sx={{
              flexGrow: 1,
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 500,
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.85rem',
              transition: 'color 0.2s'
            }}
          >
            {t.title}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255,255,255,0.3)',
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          >
            {t.duration ?? '--:--'}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
