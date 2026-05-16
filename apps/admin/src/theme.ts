import { createTheme, PaletteMode } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    ...(mode === 'dark' ? {
      background: { default: '#0a1929', paper: '#132f4c' },
    } : {}),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
