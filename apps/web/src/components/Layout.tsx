import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { fetchSettings } from '../api/client';
import { Footer } from './Footer';
import ThemeToggle from './ThemeToggle';

const nav = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Giới thiệu', path: '/about' },
  { label: 'Thành viên', path: '/members' },
  { label: 'Âm nhạc', path: '/music' },
  { label: 'Lịch diễn', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Liên hệ', path: '/contact' },
];

export function Layout() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });

  // Dynamically update browser tab favicon based on custom site settings logo
  useEffect(() => {
    const logoUrl = settings?.logoUrl;
    if (logoUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = logoUrl;
    }
  }, [settings]);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bandName = settings?.bandName ?? 'NC Huynh';

  const navIcons: Record<string, any> = {
    '/': <HomeIcon fontSize="small" />,
    '/about': <InfoIcon fontSize="small" />,
    '/members': <PeopleIcon fontSize="small" />,
    '/music': <MusicNoteIcon fontSize="small" />,
    '/events': <EventIcon fontSize="small" />,
    '/gallery': <PhotoLibraryIcon fontSize="small" />,
    '/contact': <EmailIcon fontSize="small" />,
  };

  const isDark = theme.palette.mode === 'dark';

  const navList = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: isDark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      width: 280,
      color: 'text.primary',
      borderRight: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)'
    }}>
      {/* Drawer Header */}
      <Box sx={{ p: 4, borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: '"Outfit", "Inter", sans-serif', letterSpacing: '0.1em' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>NC</Box> HUYNH
        </Typography>
      </Box>

      <List sx={{ p: 2, flexGrow: 1 }}>
        {nav.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.5,
                transition: 'all 0.3s ease',
                bgcolor: active ? 'rgba(255,45,85,0.1)' : 'transparent',
                border: active ? '1px solid rgba(255,45,85,0.2)' : '1px solid transparent',
                '&:hover': {
                  bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Box sx={{ mr: 2, color: active ? 'primary.main' : 'text.secondary', display: 'flex' }}>
                {navIcons[item.path]}
              </Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    fontFamily: '"Outfit", "Inter", sans-serif',
                    fontWeight: active ? 700 : 500,
                    color: active ? 'text.primary' : 'text.secondary',
                    fontSize: '1rem'
                  }
                }}
              />
              {active && <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: isDark ? '0 0 10px #ff2d55' : 'none' }} />}
            </ListItemButton>
          );
        })}
      </List>

      {/* Drawer Footer - Social Links */}
      <Box sx={{ p: 3, borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
        <Stack direction="row" spacing={1} justifyContent="center">
          {settings?.socialLinks?.facebook && (
            <IconButton size="small" href={settings.socialLinks.facebook} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: '#1877F2' } }}>
              <FacebookIcon fontSize="small" />
            </IconButton>
          )}
          {settings?.socialLinks?.instagram && (
            <IconButton size="small" href={settings.socialLinks.instagram} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: '#E4405F' } }}>
              <InstagramIcon fontSize="small" />
            </IconButton>
          )}
          {settings?.socialLinks?.youtube && (
            <IconButton size="small" href={settings.socialLinks.youtube} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: '#FF0000' } }}>
              <YouTubeIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Premium Background Elements */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        {/* Animated Glow Blobs */}
        <Box sx={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          background: isDark ? 'radial-gradient(circle, rgba(255,45,85,0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,45,85,0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '60vw',
          height: '60vw',
          background: isDark ? 'radial-gradient(circle, rgba(255,45,85,0.06) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(255,45,85,0.03) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }} />

        {/* Subtle noise/grain overlay */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isDark ? 0.03 : 0.015,
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
          pointerEvents: 'none'
        }} />
      </Box>

      <Helmet>
        <title>{bandName}</title>
      </Helmet>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled
            ? (isDark ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)')
            : 'transparent',
          height: { xs: 60, md: 65 },
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          color: 'text.primary',
          borderBottom: scrolled
            ? (isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)')
            : '1px solid transparent',
          zIndex: 1100,
          display: 'flex',
          justifyContent: 'center',
          transition: 'all 0.4s ease'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 6 }, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {mobile && (
              <IconButton color="inherit" edge="start" onClick={() => setOpen(true)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
            >
              {settings?.logoUrl ? (
                <Box
                  component="img"
                  src={settings.logoUrl}
                  alt={bandName}
                  sx={{
                    height: { xs: 30, md: 40 },
                    width: 'auto',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                    filter: isDark ? 'none' : 'invert(0.1)',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                />
              ) : (
                <>
                  <MusicNoteIcon sx={{ mr: 1, color: 'primary.main', fontSize: { xs: '1.2rem', md: '1.5rem' } }} />
                  <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '0.05em', fontFamily: '"Outfit", "Inter", sans-serif', fontSize: { xs: '1rem', md: '1.2rem' } }}>
                    NC HUYNH <Box component="span" sx={{ color: 'primary.main' }}>BAND</Box>
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          {!mobile && (
            <Stack direction="row" spacing={3} alignItems="center">
              {nav.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Typography
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      textDecoration: 'none',
                      color: 'text.primary',
                      opacity: active ? 1 : 0.6,
                      fontSize: '0.75rem',
                      fontWeight: active ? 700 : 500,
                      fontFamily: '"Outfit", "Inter", sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '&:hover': {
                        opacity: 1,
                        '&::after': { width: '100%' }
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -6,
                        width: active ? '100%' : '0',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #ff2d55, transparent)',
                        transition: 'all 0.3s ease',
                        boxShadow: active && isDark ? '0 0 10px #ff2d55' : 'none'
                      }
                    }}
                  >
                    {item.label}
                  </Typography>
                );
              })}
            </Stack>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {!mobile && (
              <Box sx={{ width: 45, display: 'flex', justifyContent: 'flex-end' }}>
                <ThemeToggle />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none'
          }
        }}
      >
        {navList}
      </Drawer>

      <Box component="main" sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', pt: location.pathname === '/' ? 0 : { xs: '60px', md: '65px' } }}>
        <Outlet />
      </Box>

      <Footer settings={settings} />
    </Box>
  );
}
