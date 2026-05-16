import { Box, Paper, Typography } from '@mui/material';
import type { Member } from '@band/shared';

import { useTheme } from '@mui/material/styles';

export function MemberCard({ member }: { member: Member }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 5,
        overflow: 'hidden',
        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
        '&:hover': {
          bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,1)',
          borderColor: 'primary.main',
          boxShadow: isDark 
            ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(255,45,85,0.1)'
            : '0 20px 40px rgba(0,0,0,0.08), 0 0 20px rgba(255,45,85,0.05)',
          '& .member-img': {
            transform: 'scale(1.1)',
          },
          '& .member-overlay': {
            background: isDark 
              ? 'linear-gradient(to top, rgba(255,45,85,0.3) 0%, rgba(0,0,0,0) 100%)'
              : 'linear-gradient(to top, rgba(255,45,85,0.15) 0%, rgba(255,255,255,0) 100%)',
          }
        }
      }}
    >
      {/* Image Section */}
      <Box sx={{ height: 320, overflow: 'hidden', position: 'relative' }}>
        <img
          className="member-img"
          src={member.photoUrl ?? '/placeholder-member.jpg'}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <Box
          className="member-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            background: isDark 
              ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)',
            transition: 'all 0.4s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              fontFamily: '"Outfit", "Inter", sans-serif',
              color: 'white',
              mb: 0.5,
              textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 1px 5px rgba(0,0,0,0.3)'
            }}
          >
            {member.name}
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              fontWeight: 800,
              letterSpacing: '0.25em',
              lineHeight: 1.2,
              display: 'block',
              textShadow: isDark ? '0 2px 8px rgba(255,45,85,0.4)' : 'none',
              fontSize: '0.65rem'
            }}
          >
            {member.role}
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2.5, textAlign: 'center' }}>
        {member.bio && (
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.7,
              fontSize: '0.88rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontFamily: '"Outfit", "Inter", sans-serif',
              fontWeight: 500
            }}
          >
            {member.bio}
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
