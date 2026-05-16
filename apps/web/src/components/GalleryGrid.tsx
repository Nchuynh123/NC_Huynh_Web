import { Box, Paper, Typography, Grid } from '@mui/material';
import type { GalleryItem } from '@band/shared';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import { useTheme } from '@mui/material/styles';

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              cursor: 'pointer',
              aspectRatio: '16/9',
              boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.02)',
              '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: 'primary.main',
                boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.1)',
                '& .gallery-img': { transform: 'scale(1.1)' },
                '& .caption-overlay': { opacity: 1, transform: 'translateY(0)' },
                '& .video-icon': { opacity: 0 }
              }
            }}
          >
            {item.type === 'VIDEO' ? (
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <Box
                  component="iframe"
                  src={item.url}
                  title={item.caption ?? 'Video'}
                  sx={{ width: '100%', height: '100%', border: 0, display: 'block' }}
                  allowFullScreen
                />
                <Box 
                  className="video-icon"
                  sx={{ 
                    position: 'absolute', 
                    inset: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.2)',
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                >
                  <PlayCircleOutlineIcon sx={{ color: 'white', fontSize: '3.5rem', opacity: 0.6 }} />
                </Box>
              </Box>
            ) : (
              <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <Box
                  className="gallery-img"
                  component="img"
                  src={item.url}
                  alt={item.caption ?? ''}
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              </Box>
            )}

            {/* Redesigned Caption Overlay */}
            {item.caption && (
              <Box 
                className="caption-overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                  p: 3,
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  pointerEvents: 'none',
                  zIndex: 3
                }}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'white', 
                    fontFamily: '"Outfit", "Inter", sans-serif',
                    fontWeight: 600,
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  {item.caption}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
