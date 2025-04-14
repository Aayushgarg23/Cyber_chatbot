import { Box, Typography } from '@mui/material';

const CyberSecurityQuote = () => {
  return (
    <Box sx={{
      width: '340px',
      height: '220px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.85), rgba(67, 56, 202, 0.85))',
      borderRadius: '20px',
      padding: '28px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#F8FAFC',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(12px)',
      transform: 'rotate(-3deg) translateX(-30px)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '-2px',
        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2))',
        borderRadius: '20px',
        zIndex: -1
      }
    }}>
      <Typography variant="h6" sx={{ 
        mb: 3,
        fontFamily: '"Orbitron", sans-serif',
        fontWeight: 600,
        letterSpacing: '0.7px',
        lineHeight: 1.5,
        textShadow: '0 2px 15px rgba(255, 255, 255, 0.3)',
        background: 'linear-gradient(to right, #fff, #e2e8f0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        "In the digital realm, security isn't just a feature — it's a foundation."
      </Typography>
      <Typography variant="subtitle2" sx={{ 
        opacity: 0.95,
        fontStyle: 'italic',
        letterSpacing: '1.5px',
        fontWeight: 500,
        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
      }}>
        — CyberGuard AI
      </Typography>
    </Box>
  );
};

export default CyberSecurityQuote;