import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 

  Button, 
  Grid, 
  Card, 
  CardContent,
  IconButton,
  TextField,
  Divider,
  useTheme
} from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CyberCard from '../components/CyberCard';
import VideoBanner from './VideoBanner';
const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  
  // Interactive features
  const [feedback, setFeedback] = useState('');
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  
  const handleStartChat = () => {
    navigate('/chat');
  };

  const fadeUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.15, 
        duration: 0.8, 
        type: 'spring',
        stiffness: 100
      }
    })
  };

  const handleSplineLoad = () => {
    setIsSplineLoaded(true);
  };

  const features = [
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Real-time Analysis",
      description: "Get instant feedback on potential security threats and vulnerabilities through our advanced AI system.",
      delay: 0
    },
    {
      icon: <CodeIcon fontSize="large" />,
      title: "Code Scanning",
      description: "Upload your code for comprehensive security assessment and best practices recommendations.",
      delay: 1
    },
    {
      icon: <ShieldIcon fontSize="large" />,
      title: "Threat Detection",
      description: "Advanced AI-powered system to identify and prevent security risks before they become problems.",
      delay: 2
    },
    {
      icon: <BugReportIcon fontSize="large" />,
      title: "Vulnerability Assessment",
      description: "Identify weaknesses in your systems with detailed reports and mitigation strategies.",
      delay: 3
    },
    {
      icon: <LockIcon fontSize="large" />,
      title: "Privacy Protection",
      description: "Ensure your data stays secure with our comprehensive privacy protection recommendations.",
      delay: 4
    }
  ];

  return (
    <Box>
      {/* Hero Section with 3D animation */}
      <Box 
        sx={{
          minHeight: '80vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          mb: 10,
        }}
      >
        <motion.div style={{ opacity, scale, y, position: 'absolute', width: '100%', height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '60%',
              height: '100%',
              display: { xs: 'none', md: 'block' }
            }}
          >
            <Box sx={{ opacity: isSplineLoaded ? 1 : 0, transition: 'opacity 1s ease' }}>
              <Spline
                scene="https://prod.spline.design/s-j5jNSd8tcMVAPo/scene.splinecode"
                onLoad={handleSplineLoad}
              />
            </Box>
            {!isSplineLoaded && (
              <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: theme.palette.text.secondary
              }}>
                Loading 3D model...
              </Box>
            )}
          </Box>
        </motion.div>

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ pt: { xs: 4, md: 0 } }}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  custom={0}
                >
                  <Typography 
                    variant="h1" 
                    sx={{ 
                      mb: 3,
                      background: 'linear-gradient(45deg, #fff, #A78BFA)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    CyberGuard
                  </Typography>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  custom={1}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      mb: 3,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Your Personal Cybersecurity Assistant
                  </Typography>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  custom={2}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 5,
                      color: theme.palette.text.secondary,
                      maxWidth: 600
                    }}
                  >
                    Get instant security analysis, vulnerability assessments, and expert recommendations 
                    powered by advanced AI technology. Stay protected in today's complex digital landscape.
                  </Typography>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUpVariants}
                  custom={3}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleStartChat}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 2,
                      px: 4,
                      background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
                      fontSize: '1.1rem',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #7C3AED, #2563EB)',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(139, 92, 246, 0.5)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Secure Chat
                  </Button>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100px',
            background: 'linear-gradient(to top, #0F172A, transparent)',
            zIndex: 1
          }}
        />
      </Box>

      {/* Video Banner Section */}
      <Box sx={{ mb: 2 }}>
        <VideoBanner />
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl">
        <Box sx={{ mb: 10 }}>
          <Typography 
            variant="h3" 
            component={motion.h3}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            sx={{ 
              textAlign: 'center',
              mb: 8,
              background: 'linear-gradient(45deg, #fff, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Advanced Security Features
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 3,
                          color: theme.palette.primary.main
                        }}
                      >
                        {feature.icon}
                        <Typography variant="h6" sx={{ ml: 2 }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Cyber Card Component */}
        <CyberCard />

        {/* Feedback Section */}
        <Box sx={{ py: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Typography variant="h3" sx={{ 
                  mb: 3,
                  background: 'linear-gradient(45deg, #fff, #A78BFA)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Share Your Security Concerns
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
                  Our AI-powered assistant is here to help you with any cybersecurity questions or concerns. 
                  Start a conversation now to get professional security advice tailored to your needs.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleStartChat}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
                    boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                  }}
                >
                  Talk to Our Assistant
                </Button>
              </motion.div>
            </Grid>
           
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
