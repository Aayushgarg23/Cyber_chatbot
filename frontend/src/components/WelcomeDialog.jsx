import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  useTheme,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import CodeIcon from '@mui/icons-material/Code';
import BugReportIcon from '@mui/icons-material/BugReport';
import ShieldIcon from '@mui/icons-material/Shield';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import DoneIcon from '@mui/icons-material/Done';

const WelcomeDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleComplete = () => {
    onClose();
  };

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }}/>,
      title: 'Real-time Security Analysis',
      description: 'Get instant feedback on potential cybersecurity threats and vulnerabilities in your systems, networks, and applications.',
      color: theme.palette.primary.main,
      image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?q=80&w=200&auto=format'
    },
    {
      icon: <CodeIcon sx={{ fontSize: 40 }}/>,
      title: 'Code Security Scanning',
      description: 'Upload your code for comprehensive security assessment. Our AI will detect vulnerabilities, anti-patterns, and suggest best practices.',
      color: theme.palette.info.main,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format'
    },
    {
      icon: <BugReportIcon sx={{ fontSize: 40 }}/>,
      title: 'Vulnerability Assessment',
      description: 'Identify security weaknesses and potential exploits before they become problems with detailed reports and mitigation strategies.',
      color: theme.palette.warning.main,
      image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=200&auto=format'
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40 }}/>,
      title: 'Privacy Protection',
      description: 'Get personalized recommendations to enhance your digital security posture and protect sensitive information from data breaches.',
      color: theme.palette.success.main,
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=200&auto=format'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16, 
          zIndex: 10 
        }}
      >
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': { 
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ p: 0, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 500 }}>
        {/* Left panel with steps */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '35%' },
            bgcolor: 'rgba(30, 41, 59, 0.5)',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography 
            variant="h4" 
            component={motion.h4}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ 
              mb: 4,
              color: 'white',
              background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            Welcome to CyberGuard
          </Typography>
          
          <Stepper 
            activeStep={activeStep} 
            orientation="vertical"
            sx={{ 
              '& .MuiStepLabel-label': { 
                color: 'text.secondary',
                '&.Mui-active': { color: 'white' }
              },
              '& .MuiStepConnector-line': {
                borderColor: 'rgba(148, 163, 184, 0.2)'
              }
            }}
          >
            {features.map((feature, index) => (
              <Step key={index}>
                <StepLabel 
                  StepIconProps={{
                    style: {
                      color: activeStep === index ? feature.color : 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: activeStep === index ? 600 : 400,
                      color: activeStep === index ? 'white' : 'text.secondary',
                    }}
                  >
                    {feature.title}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary', 
              mt: 4, 
              textAlign: 'center',
              opacity: 0.7
            }}
          >
            Your security journey begins here
          </Typography>
        </Box>

        {/* Right panel with content */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '65%' },
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cardVariants}
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  gap: 3,
                  mb: 4,
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80,
                    bgcolor: `${features[activeStep].color}20`,
                    color: features[activeStep].color,
                    boxShadow: `0 0 30px ${features[activeStep].color}40`
                  }}
                >
                  {features[activeStep].icon}
                </Avatar>
                
                <Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: 'white', 
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    {features[activeStep].title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {features[activeStep].description}
                  </Typography>
                </Box>
              </Box>
            
              <Box 
                sx={{ 
                  mt: 2, 
                  p: 2, 
                  bgcolor: 'rgba(15, 23, 42, 0.5)', 
                  borderRadius: 2,
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: 200,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box 
                  component="img"
                  src={features[activeStep].image}
                  alt={features[activeStep].title}
                  sx={{ 
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    opacity: 0.7,
                    borderRadius: 1,
                    filter: 'blur(1px)',
                    transition: 'all 0.3s ease'
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute',
                    inset: 0,
                    bgcolor: `${features[activeStep].color}15`,
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: 2,
                    textAlign: 'center'
                  }}
                >
                  <Box 
                    sx={{ 
                      bgcolor: features[activeStep].color, 
                      color: 'white', 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    {features[activeStep].icon}
                  </Box>
                  <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                    {activeStep === 0 && "Ask me anything about cybersecurity"}
                    {activeStep === 1 && "Upload code for security analysis"}
                    {activeStep === 2 && "Identify vulnerabilities before they become problems"}
                    {activeStep === 3 && "Get personalized security recommendations"}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <Divider sx={{ my: 3, borderColor: 'rgba(148, 163, 184, 0.1)' }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button 
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<KeyboardArrowLeftIcon />}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': { color: 'white' }
                  }}
                >
                  Back
                </Button>
                <Box>
                  {activeStep === features.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleComplete}
                      endIcon={<DoneIcon />}
                      sx={{
                        background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
                        boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
                      }}
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={handleNext}
                      endIcon={<KeyboardArrowRightIcon />}
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.light,
                          backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;