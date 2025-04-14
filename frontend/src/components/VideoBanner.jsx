import React from "react";
import { Box, Typography, Container } from '@mui/material';

const VideoBanner = () => {
  return (
    <Box 
      sx={{ 
        width: '100vw',
        height: '60vh',
        position: 'relative',
        overflow: 'hidden',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        marginBottom: 8
      }}
    >
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dv9iswy2f/video/upload/v1744041256/5473968-uhd_4096_2160_25fps_qbrjta.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)'
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: 600,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #fff, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Our Cyber Security Hub
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default VideoBanner;