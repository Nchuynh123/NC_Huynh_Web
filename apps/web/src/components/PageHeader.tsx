import { Box, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <Helmet>
        <title>{title} — NC Huynh Band</title>
      </Helmet>
      <Box sx={{ py: { xs: 3, md: 4 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              fontFamily: '"Outfit", sans-serif', 
              fontWeight: 800, 
              fontSize: { xs: '2rem', md: '2.5rem' } 
            }} 
            gutterBottom
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" maxWidth={600} sx={{ opacity: 0.8 }}>
              {subtitle}
            </Typography>
          )}
        </Container>
      </Box>
    </>
  );
}
