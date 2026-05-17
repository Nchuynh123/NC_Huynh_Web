import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import type { SiteSettings } from '@band/shared';
import { Link as RouterLink } from 'react-router-dom';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const social = settings?.socialLinks;
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        pt: 10,
        pb: 6,
        mt: 10,
        bgcolor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.02)',
        backdropFilter: 'blur(20px)',
        borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
        position: 'relative',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  fontFamily: '"Outfit", "Inter", sans-serif',
                  color: 'text.primary',
                  letterSpacing: '-0.02em',
                  mb: 2
                }}
              >
                {settings?.bandName ?? 'NC HUYNH'} <Box component="span" sx={{ color: 'primary.main' }}>BAND</Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  fontFamily: '"Inter", sans-serif',
                  maxWidth: 280,
                  opacity: 0.8
                }}
              >
                Hành trình âm nhạc đầy cảm xúc và đam mê. Mang đến những giai điệu chân thực nhất cho tâm hồn.
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links Section */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 800, mb: 3, fontFamily: '"Outfit", "Inter", sans-serif' }}>
              Khám phá
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Giới thiệu', path: '/about' },
                { label: 'Thành viên', path: '/members' },
                { label: 'Âm nhạc', path: '/music' },
                { label: 'Lịch diễn', path: '/events' },
                { label: 'Gallery', path: '/gallery' }
              ].map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s',
                    '&:hover': { color: 'primary.main', pl: 1 }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Social Section */}
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 800, mb: 3, fontFamily: '"Outfit", "Inter", sans-serif' }}>
              Kết nối
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mb: 4 }}>
              {social?.facebook && (
                <IconButton
                  href={social.facebook}
                  target="_blank"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'white', bgcolor: '#1877F2', transform: 'translateY(-4px)' },
                    transition: 'all 0.3s'
                  }}
                >
                  <FacebookIcon fontSize="small" />
                </IconButton>
              )}
              {social?.instagram && (
                <IconButton
                  href={social.instagram}
                  target="_blank"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'white', bgcolor: '#E4405F', transform: 'translateY(-4px)' },
                    transition: 'all 0.3s'
                  }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
              )}
              {social?.youtube && (
                <IconButton
                  href={social.youtube}
                  target="_blank"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'white', bgcolor: '#FF0000', transform: 'translateY(-4px)' },
                    transition: 'all 0.3s'
                  }}
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
              )}
              {social?.spotify && (
                <IconButton
                  href={social.spotify}
                  target="_blank"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    '&:hover': { color: 'white', bgcolor: '#1DB954', transform: 'translateY(-4px)' },
                    transition: 'all 0.3s'
                  }}
                >
                  <MusicNoteIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6, fontFamily: '"Inter", sans-serif', display: 'block' }}>
              Dành cho booking & hợp tác:
              <br />
              <Link href="mailto:Nchuynh24102001@gmail.com" sx={{ color: 'primary.main', textDecoration: 'none', mt: 0.5, display: 'inline-block', fontWeight: 600 }}>
                Nchuynh24102001@gmail.com
              </Link>
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ pt: 6, mt: 6, borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, fontFamily: '"Inter", sans-serif', letterSpacing: '0.05em' }}>
            © {year} {settings?.bandName ?? 'NC HUYNH'}. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
