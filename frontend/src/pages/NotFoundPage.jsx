import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFoundPage = () => {
  const theme = useTheme();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container maxWidth="md" sx={{ 
      height: 'calc(100vh - 200px)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center' 
    }}>
      <Box>
        <Box sx={{ mb: 4, position: 'relative' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
          >
            <ErrorOutlineIcon 
              sx={{ 
                fontSize: 120, 
                color: theme.palette.primary.main,
                opacity: 0.8,
              }} 
            />
          </motion.div>

          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 5
            }}
            style={{
              position: 'absolute',
              top: 5,
              right: '50%',
              marginRight: -95,
              zIndex: 2
            }}
          >
            <SecurityIcon 
              sx={{ 
                fontSize: 40, 
                color: theme.palette.error.main,
                filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))'
              }} 
            />
          </motion.div>

          {/* Animated shield bits */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0.8,
                scale: 0.5 + Math.random() * 0.5
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 200, 
                y: (Math.random() - 0.5) * 200,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: i * 0.2,
                ease: "easeOut"
              }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                zIndex: 1
              }}
            />
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Typography 
            variant="h2" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #fff, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700
            }}
          >
            404
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Security Breach Detected
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}
          >
            The page you're looking for doesn't exist or has been moved to a secure location.
            Our security protocols will redirect you to safety in {countdown} seconds.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Button
            variant="contained"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              py: 1.5,
              px: 3,
              background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
              boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
              mr: 2
            }}
          >
            Return to Safety
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default NotFoundPage; 