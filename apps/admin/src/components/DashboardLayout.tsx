import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import AlbumIcon from '@mui/icons-material/Album';
import EventIcon from '@mui/icons-material/Event';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const drawerWidth = 240;

const menu = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Cài đặt', path: '/settings', icon: <SettingsIcon /> },
  { label: 'Thành viên', path: '/members', icon: <PeopleIcon /> },
  { label: 'Album', path: '/albums', icon: <AlbumIcon /> },
  { label: 'Lịch diễn', path: '/events', icon: <EventIcon /> },
  { label: 'Gallery', path: '/gallery', icon: <PhotoLibraryIcon /> },
  { label: 'Liên hệ', path: '/contacts', icon: <MailIcon /> },
];



export function DashboardLayout() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(!mobile);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ fontWeight: 800 }}>
          Band Admin
        </Typography>
      </Toolbar>
      <List sx={{ flex: 1 }}>
        {menu.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <ListItemButton
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Đăng xuất" />
      </ListItemButton>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          {mobile && (
            <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
            NC Huynh Band — Admin
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={mobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: mobile ? 0 : `${drawerWidth}px` }}>
        <Outlet />
      </Box>
    </Box>
  );
}
