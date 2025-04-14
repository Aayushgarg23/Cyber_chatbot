import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Divider,
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import { useAuth } from '../contexts/AuthContext';
import FirebaseAuth from '../components/FirebaseAuth';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setGuest } = useAuth();

  const handleGuestAccess = () => {
    setGuest();
    navigate('/chat');
  };

  return (
    <Container maxWidth="sm" sx={{ 
      py: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <Paper sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Typography variant="h4" sx={{ 
          mb: 4,
          color: 'white',
          textAlign: 'center'
        }}>
          Welcome to CyberGuard
        </Typography>

        <FirebaseAuth />

        <Box sx={{ mt: 3, width: '100%' }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGuestAccess}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Continue as Guest
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;