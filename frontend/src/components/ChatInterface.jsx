import { useState, useRef } from 'react';
import { Container, Paper, Typography, IconButton, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Spline from '@splinetool/react-spline';
import Message from './Message';
import InputBox from './InputBox';
import LogoutIcon from '@mui/icons-material/Logout';
import CyberSecurityQuote from './CyberSecurityQuote';

const ChatInterface = ({ messages, onSend, user, onLogout }) => {
  const chatContainerRef = useRef();

  return (
    <Box sx={{ 
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }}>
      {/* Robot Spline Animation - Left side */}
      <Box sx={{
        width: '45%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pl: 4
      }}>
        <Box sx={{
          width: '100%',
          height: '80%',
          position: 'relative'
        }}>
          <Spline
            scene="https://prod.spline.design/s-j5jNSd8tcMVAPo/scene.splinecode"
          />
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}>
            <CyberSecurityQuote />
          </Box>
        </Box>
      </Box>

      {/* Chat Container - Right side */}
      <Container maxWidth="md" sx={{ 
        height: '100%', 
        display: 'flex',
        alignItems: 'center',
        pr: 4,
        width: '55%'
      }}>
        <Paper
          elevation={24}
          sx={{
            height: '85%',
            width: '100%',
            bgcolor: 'rgba(30, 41, 59, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            borderRadius: 4,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 0 40px rgba(51, 65, 85, 0.5)'
          }}
        >
          {/* Header */}
          <Box sx={{ 
            p: 2.5, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
            bgcolor: 'rgba(15, 23, 42, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <Typography variant="h5" sx={{ 
              color: '#F8FAFC',
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textShadow: '0 0 20px rgba(138, 43, 226, 0.3)'
            }}>
              Cybersecurity Assistant
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: '#8B5CF6',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
              }}>
                {user.isGuest ? 'G' : user.email?.[0].toUpperCase()}
              </Avatar>
              <IconButton 
                onClick={onLogout} 
                sx={{ 
                  color: '#E2E8F0',
                  '&:hover': {
                    color: '#F8FAFC',
                    bgcolor: 'rgba(139, 92, 246, 0.1)'
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Messages */}
          <Box 
            ref={chatContainerRef}
            sx={{ 
              flex: 1, 
              overflowY: 'auto',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(15, 23, 42, 0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(139, 92, 246, 0.3)',
                borderRadius: '4px',
                '&:hover': {
                  background: 'rgba(139, 92, 246, 0.5)',
                }
              }
            }}
          >
            {messages.map((msg, i) => (
              <Message key={i} {...msg} />
            ))}
          </Box>

          {/* Input */}
          <Box sx={{ 
            p: 3, 
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            bgcolor: 'rgba(15, 23, 42, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <InputBox onSend={onSend} user={user} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ChatInterface;