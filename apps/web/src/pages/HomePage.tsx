import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';
import { fetchAlbums, fetchSettings, fetchEvents } from '../api/client';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { FeaturedMusicSection } from '../components/FeaturedMusicSection';
import { FeaturedEventsSection } from '../components/FeaturedEventsSection';

export function HomePage() {
  const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: fetchSettings });
  const { data: albums, isLoading: isLoadingAlbums } = useQuery({ queryKey: ['albums'], queryFn: fetchAlbums });
  const { data: events, isLoading: isLoadingEvents } = useQuery({ queryKey: ['events'], queryFn: () => fetchEvents() });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <HeroSection settings={settings} />

      {/* About Section */}
      <AboutSection aboutText={settings?.about ?? undefined} />

      {/* Featured Music Section */}
      <FeaturedMusicSection albums={albums ?? []} isLoading={isLoadingAlbums} />

      {/* Featured Events Section */}
      <FeaturedEventsSection events={events ?? []} isLoading={isLoadingEvents} />
    </Box>
  );
}
