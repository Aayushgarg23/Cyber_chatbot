import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Avatar, 
  Box, 
  IconButton, 
  Tooltip, 
  Chip,
  Divider,
  useTheme,
  Drawer
} from '@mui/material';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import axios from 'axios';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import RobotIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../contexts/AuthContext';
import Message from '../components/Message';
import InputBox from '../components/InputBox';
import CyberSecurityQuote from '../components/CyberSecurityQuote';
import WelcomeDialog from '../components/WelcomeDialog';
import ConversationsList from '../components/ConversationsList';
import API from '../api';  // Make sure you're importing and using this API instance
import { getStaticResponse } from '../utils/staticResponses';

// Add this scene URL near your other constants
const SPLINE_SCENE_URL = "https://prod.spline.design/s-j5jNSd8tcMVAPo/scene.splinecode";

// Update the imports at the top
import { CohereClient } from 'cohere-ai';

// Replace the cohere initialization with this
const cohere = new CohereClient({
  token: 'WFaYZ1K81v33CYmnXrAqJhtrgII8BYNp1DZ9VM09'
});

const ChatPage = () => {
  // Add axios configuration right after imports and before component
  axios.defaults.baseURL = 'http://localhost:5000';
  const theme = useTheme();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [showTips, setShowTips] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const chatContainerRef = useRef();

  useEffect(() => {
    if (!currentUser && !currentUser?.isGuest) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const securityTips = [
    "Use unique passwords for each account",
    "Enable two-factor authentication where possible",
    "Regularly update your software and operating systems",
    "Be careful with email attachments and links",
    "Back up your data regularly"
  ];

  // Remove the axios import and configuration
  // Remove API import
  
  const handleSend = async (message, type = "text", file = null) => {
    if (!currentUser) return;
  
    setMessages(prev => [...prev, { 
      content: message, 
      isUser: true, 
      type 
    }]);
  
    try {
      const response = await cohere.generate({
        model: 'command',
        prompt: `You are CyberGuard, a specialized cybersecurity AI assistant. Your core directives:
  
        STRICT RULES:
        1. ONLY respond to questions about:
           - Cybersecurity
           - Information security
           - Digital safety
           - Network security
           - Data protection
           - Privacy measures
           - Security best practices
           - Cyber threats and defenses
  
        2. For ANY off-topic questions (entertainment, homework, general chat, etc.):
           Response: "I am a specialized cybersecurity assistant. I can only help with cybersecurity-related questions. Please ask me about digital security, cyber threats, or data protection instead."
  
        3. For greetings: Respond professionally while immediately steering the conversation toward security topics.
  
        Current user message: ${message}
  
        Respond as a cybersecurity expert (maintain professional tone):`,
        max_tokens: 300,
        temperature: 0.7,
        stop_sequences: ["User:", "Human:"],
      });
  
      setMessages(prev => [...prev, {
        content: response.generations[0].text.trim(),
        isUser: false,
        type: "text",
        severity: "info",
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: "I apologize, but I encountered an error. Please try again with your cybersecurity question.",
        isUser: false,
        type: "text",
        severity: "error",
      }]);
    }
  };
  
  // Remove the handleSendMessage function at the bottom as it's no longer needed
  return (
    <Container maxWidth="xl" sx={{ 
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - 64px)',
      position: 'relative'
    }}>
      <Box sx={{ 
        display: 'flex',
        gap: 4,
        height: 'calc(100vh - 200px)',
        mb: 8 // Add margin bottom for footer
      }}>
        {/* Left side - Robot & Tips */}
        <Box sx={{ 
          width: { xs: '0%', lg: '35%' }, 
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          position: 'relative'
        }}>
          <Box sx={{ 
            position: 'relative',
            height: '60%',
            minHeight: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* Spline Container */}
            <Box sx={{
              width: '100%',
              height: '100%',
              position: 'relative'
            }}>
              <Spline
                scene={SPLINE_SCENE_URL}
                onLoad={handleSplineLoad}
                style={{
                  width: '100%',
                  height: '100%',
                  opacity: isSplineLoaded ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              />
            </Box>

            {/* Floating Quote/Tips Box */}
            <Paper 
              elevation={6}
              sx={{ 
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                p: 3,
                bgcolor: 'rgba(20, 30, 48, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                zIndex: 2
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#fff', 
                  mb: 1, 
                  fontSize: '1rem',
                  background: 'linear-gradient(45deg, #fff, #A78BFA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                CyberGuard Tips
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {securityTips[Math.floor(Math.random() * securityTips.length)]}
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Right side - Chat */}
        <Box sx={{ 
          width: { xs: '100%', lg: '65%' },
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Paper
            elevation={24}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'rgba(20, 30, 48, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            {/* Chat Header with History Toggle */}
            <Box sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              bgcolor: 'rgba(20, 30, 48, 0.9)'
            }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>
                CyberGuard Assistant
              </Typography>
              <IconButton 
                onClick={() => setShowHistory(!showHistory)}
                sx={{ color: '#fff' }}
              >
                <HistoryIcon />
              </IconButton>
            </Box>

            {/* Chat Messages Area */}
            <Box sx={{ 
              flex: 1,
              overflowY: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {messages.map((msg, index) => (
                <Message key={index} message={msg} />
              ))}
            </Box>

            {/* Input Area */}
            <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <InputBox onSend={handleSend} />
            </Box>
          </Paper>
        </Box>

        {/* Chat History Drawer */}
        <Drawer
          anchor="right"
          open={showHistory}
          onClose={() => setShowHistory(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 300,
              bgcolor: 'rgba(20, 30, 48, 0.95)',
              backdropFilter: 'blur(20px)',
              border: 'none'
            }
          }}
        >
          <ConversationsList />
        </Drawer>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          py: 2,
          bgcolor: 'rgba(20, 30, 48, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 10
        }}
      >
        <Container>
          <Typography variant="body2" align="center" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © 2024 CyberGuard AI Assistant. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};

const handleSendMessage = async (message) => {
  try {
    // Add user message to chat
    const userMessage = {
      content: message,
      role: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    // Get static response instead of API call
    const response = getStaticResponse(message);
    
    // Add bot response to chat
    const botMessage = {
      content: response,
      role: 'assistant',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, botMessage]);

  } catch (error) {
    console.error('Error:', error);
  }
};

export default ChatPage;