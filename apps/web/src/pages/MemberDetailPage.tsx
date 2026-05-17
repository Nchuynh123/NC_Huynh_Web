import { useParams, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { fetchMembers } from '../api/client';
import { slugify } from '@band/shared';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';

export function MemberDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { slug } = useParams<{ slug: string }>();

  // Fetch all members and find the active one by matching the slug of their name
  const { data: members, isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: fetchMembers,
  });

  const member = members?.find((m) => slugify(m.name) === slug);

  if (isError || (!isLoading && !member)) {
    return (
      <Container sx={{ pt: 12, pb: 10, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: 'text.primary', mb: 3 }}>
          Không tìm thấy thông tin thành viên.
        </Typography>
        <Button component={Link} to="/members" variant="contained">
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <Container maxWidth="lg" sx={{ mt: 2, position: 'relative', zIndex: 2 }}>
        {/* Back Button */}
        <IconButton
          component={Link}
          to="/members"
          sx={{
            mb: 2,
            color: 'text.secondary',
            opacity: 0.5,
            transition: 'all 0.2s',
            '&:hover': { color: 'primary.main', transform: 'translateX(-5px)', opacity: 1 }
          }}
        >
          <ArrowBackIcon sx={{ fontSize: '1.2rem' }} />
        </IconButton>

        {isLoading ? (
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rounded" height={450} sx={{ borderRadius: 5, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Skeleton variant="text" width="40%" height={30} sx={{ mb: 2, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
              <Skeleton variant="text" width="70%" height={60} sx={{ mb: 4, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
              <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4, bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }} />
            </Grid>
          </Grid>
        ) : (
          member && (
            <Grid container spacing={6} alignItems="flex-start">
              {/* Left Column: Member Photo with premium frame */}
              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.2,
                    borderRadius: 5,
                    bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                    boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.06)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: isDark
                        ? '0 30px 60px rgba(255,45,85,0.15)'
                        : '0 30px 60px rgba(255,45,85,0.08)',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={member.photoUrl ?? '/placeholder-member.jpg'}
                    alt={member.name}
                    sx={{
                      width: '100%',
                      aspectRatio: '3/4',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      borderRadius: 4,
                      display: 'block',
                    }}
                  />
                </Paper>
              </Grid>

              {/* Right Column: Member Bio and Details */}
              <Grid item xs={12} md={8}>
                <Box sx={{ pl: { md: 2 } }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 800,
                      letterSpacing: '0.3em',
                      display: 'block',
                      mb: 0.5,
                      fontSize: '0.68rem'
                    }}
                  >
                    BAND MEMBER
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 900,
                      fontFamily: '"Outfit", "Inter", sans-serif',
                      color: 'text.primary',
                      background: isDark
                        ? 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.5) 100%)'
                        : 'linear-gradient(to bottom, #121212 0%, rgba(18,18,18,0.5) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {member.name}
                  </Typography>

                  {/* Metadata Stats Stack */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2.5, sm: 5 }} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <MusicNoteIcon sx={{ color: 'primary.main', fontSize: '1.3rem', mr: 1.5, opacity: 0.8 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, display: 'block', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                          Vai trò
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                          {member.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GroupsIcon sx={{ color: 'primary.main', fontSize: '1.3rem', mr: 1.5, opacity: 0.8 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, display: 'block', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                          Ban nhạc
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                          NC Huynh
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BadgeIcon sx={{ color: 'primary.main', fontSize: '1.3rem', mr: 1.5, opacity: 0.8 }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.5, display: 'block', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                          Trạng thái
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                          {member.isActive ? 'Đang hoạt động' : 'Cựu thành viên'}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 4, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />

                  {/* Bio Description Box */}
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 800,
                        fontFamily: '"Outfit", "Inter", sans-serif',
                        color: 'text.primary',
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: '0.9rem'
                      }}
                    >
                      Tiểu sử & Hành trình
                    </Typography>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        bgcolor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.85,
                          fontSize: '1.05rem',
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 400,
                          whiteSpace: 'pre-line'
                        }}
                      >
                        {member.bio || `Chưa có thông tin giới thiệu chi tiết cho thành viên ${member.name}. Cùng đón chờ những chia sẻ về hành trình âm nhạc của họ trong tương lai nhé!`}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          )
        )}
      </Container>
    </Box>
  );
}
