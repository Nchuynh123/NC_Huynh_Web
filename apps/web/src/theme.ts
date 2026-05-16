import { createTheme, PaletteMode } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'dark' ? {
      primary: { main: '#ff2d55' }, // Vibrant Apple Music Red
      secondary: { main: '#f4a261' },
      background: { default: '#0a0a0a', paper: '#121212' },
      text: { primary: '#f5f5f5', secondary: '#b0b0b0' },
    } : {
      primary: { main: '#ff2d55' },
      secondary: { main: '#2d55ff' }, // Slightly different secondary for light
      background: { default: '#fafafa', paper: '#ffffff' },
      text: { primary: '#121212', secondary: '#555555' },
    }),
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 800 },
    h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
      },
    },
  },
});
