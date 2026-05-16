import { Container, Stack, Typography, Box, Paper, IconButton, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchSettings } from '../api/client';
import { ContactForm } from '../components/ContactForm';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

export function ContactPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
  const social = settings?.socialLinks;

  return (
    <Box sx={{ pb: 10 }}>
      <Container maxWidth="md" sx={{ mt: 4, position: 'relative', zIndex: 2 }}>
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
            GET IN TOUCH
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
            Liên hệ <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1.1rem',
              fontFamily: '"Inter", sans-serif',
              fontWeight: 400,
              opacity: 0.8
            }}
          >
            Booking, hợp tác dự án hoặc đơn giản là gửi một lời nhắn yêu thương đến NC Huynh Band.
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            maxWidth: 700,
            mx: 'auto',
            p: { xs: 3, md: 6 },
            borderRadius: 6,
            bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            boxShadow: isDark ? '0 40px 100px rgba(0,0,0,0.5)' : '0 40px 100px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '40%',
              height: '40%',
              bgcolor: 'primary.main',
              filter: 'blur(100px)',
              opacity: isDark ? 0.1 : 0.05,
              zIndex: 0
            }}
          />

          <Stack spacing={5} sx={{ position: 'relative', zIndex: 1 }}>
            {/* Social Links Section */}
            {social && (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.2em', mb: 3, fontWeight: 700 }}>
                  Kết nối qua mạng xã hội
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                  {social.facebook && (
                    <IconButton
                      href={social.facebook}
                      target="_blank"
                      sx={{
                        color: 'text.primary',
                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        '&:hover': { color: 'white', bgcolor: '#1877F2', transform: 'translateY(-4px)' },
                        transition: 'all 0.3s',
                        m: 0.5
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                  )}
                  {social.instagram && (
                    <IconButton
                      href={social.instagram}
                      target="_blank"
                      sx={{
                        color: 'text.primary',
                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        '&:hover': { color: 'white', bgcolor: '#E4405F', transform: 'translateY(-4px)' },
                        transition: 'all 0.3s',
                        m: 0.5
                      }}
                    >
                      <InstagramIcon />
                    </IconButton>
                  )}
                  {social.youtube && (
                    <IconButton
                      href={social.youtube}
                      target="_blank"
                      sx={{
                        color: 'text.primary',
                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        '&:hover': { color: 'white', bgcolor: '#FF0000', transform: 'translateY(-4px)' },
                        transition: 'all 0.3s',
                        m: 0.5
                      }}
                    >
                      <YouTubeIcon />
                    </IconButton>
                  )}
                  {social.spotify && (
                    <IconButton
                      href={social.spotify}
                      target="_blank"
                      sx={{
                        color: 'text.primary',
                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        '&:hover': { color: 'white', bgcolor: '#1DB954', transform: 'translateY(-4px)' },
                        transition: 'all 0.3s',
                        m: 0.5
                      }}
                    >
                      <MusicNoteIcon />
                    </IconButton>
                  )}
                </Stack>
              </Box>
            )}

            <Box>
              <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800, fontFamily: '"Outfit", sans-serif', mb: 3, textAlign: 'center' }}>
                Gửi lời nhắn cho chúng tôi
              </Typography>
              <ContactForm />
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
