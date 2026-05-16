import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ColorModeProvider } from './context/ColorModeContext';

import { ScrollToTop } from './components/ScrollToTop';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1 } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </ColorModeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
