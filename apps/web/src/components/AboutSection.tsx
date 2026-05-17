import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';

interface AboutSectionProps {
  aboutText?: string;
}

export function AboutSection({ aboutText }: AboutSectionProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: 'relative' }}>
      {/* Decorative Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '40%',
          height: '40%',
          bgcolor: 'primary.main',
          filter: 'blur(150px)',
          opacity: isDark ? 0.05 : 0.03,
          zIndex: 0
        }}
      />

      <Grid container spacing={6} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid item xs={12} md={7}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.4em', mb: 1, display: 'block' }}
          >
            OUR STORY
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontFamily: '"Outfit", "Inter", sans-serif',
              color: 'text.primary',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: isDark
                ? 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.4) 100%)'
                : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Giới thiệu <Box component="span" sx={{ color: 'primary.main', WebkitTextFillColor: 'initial' }}>.</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.9,
              fontSize: '1.15rem',
              fontFamily: '"Inter", sans-serif',
              mb: 4,
              fontWeight: 400
            }}
          >
            {aboutText?.slice(0, 350) ?? 'Đang tải câu chuyện của chúng mình...'}
            {(aboutText?.length ?? 0) > 350 && '...'}
          </Typography>
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
              color: 'text.primary',
              textTransform: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(255,45,85,0.05)',
                transform: 'translateX(5px)'
              }
            }}
          >
            Câu chuyện của chúng mình
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
