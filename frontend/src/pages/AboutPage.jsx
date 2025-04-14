import { 
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LockIcon from '@mui/icons-material/Lock';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import DataObjectIcon from '@mui/icons-material/DataObject';

const AboutPage = () => {
  const theme = useTheme();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.2,
        duration: 0.8 
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: 0.2,
        duration: 0.8 
      }
    }
  };

  const features = [
    {
      icon: <SecurityIcon color="primary" />,
      title: "Advanced Security Analysis",
      description: "Our AI-powered security analysis provides comprehensive threat detection and prevention strategies."
    },
    {
      icon: <PsychologyIcon color="primary" />,
      title: "Intelligent Assistant",
      description: "The cybersecurity assistant leverages machine learning to understand complex security issues."
    },
    {
      icon: <LockIcon color="primary" />,
      title: "Privacy Protection",
      description: "Your data privacy is our top priority. All conversations and uploads are securely processed."
    },
    {
      icon: <DataObjectIcon color="primary" />,
      title: "Code Security Analysis",
      description: "Upload your code for detailed security analysis to identify vulnerabilities before deployment."
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ mb: 10, mt: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            align="center"
            sx={{ 
              mb: 3,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #fff, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About CyberGuard
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto', mb: 5 }}
          >
            Providing advanced cybersecurity solutions through artificial intelligence
            to protect individuals and organizations from evolving digital threats.
          </Typography>
        </motion.div>

        <Box 
          sx={{ 
            width: 120, 
            height: 120, 
            mx: 'auto',
            mb: 5,
            position: 'relative'
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.4
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'rgba(139, 92, 246, 0.1)',
                border: '3px solid',
                borderColor: theme.palette.primary.main,
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)'
              }}
            >
              <SecurityIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
            </Avatar>
          </motion.div>
          
          {/* Orbiting elements */}
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              component={motion.div}
              initial={{ rotate: index * 120 }}
              animate={{ rotate: index * 120 + 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px dashed',
                borderColor: `rgba(139, 92, 246, ${0.3 - index * 0.1})`,
                transformOrigin: 'center'
              }}
            >
              <Box 
                component={motion.div}
                sx={{
                  position: 'absolute',
                  top: -5,
                  left: 55,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: theme.palette.primary.main,
                  boxShadow: `0 0 10px ${theme.palette.primary.main}`
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mission Section */}
      <Grid container spacing={6} sx={{ mb: 10 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At CyberGuard, we believe that cybersecurity should be accessible to everyone. 
              Our mission is to democratize advanced security tools and knowledge through 
              an intuitive AI-powered platform that anyone can use, regardless of their technical expertise.
            </Typography>
            <Typography variant="body1">
              We're committed to staying ahead of emerging threats, continuously improving our 
              AI models, and providing actionable security insights that help our users protect 
              their digital lives and businesses.
            </Typography>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <Paper
              elevation={4}
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <VerifiedUserIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                Our Core Values
              </Typography>
              <List>
                {[
                  "Security Excellence",
                  "Privacy Protection",
                  "User Empowerment",
                  "Continuous Innovation",
                  "Ethical AI Development"
                ].map((value, index) => (
                  <ListItem key={index} sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleIcon color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={value} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Features Section */}
      <Box sx={{ mb: 10 }}>
        <Typography 
          variant="h4" 
          align="center"
          sx={{ mb: 6 }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    height: '100%',
                    bgcolor: 'rgba(30, 41, 59, 0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{ 
                        bgcolor: 'rgba(139, 92, 246, 0.1)', 
                        color: theme.palette.primary.main,
                        mr: 2
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6">
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Technology Stack */}
      <Box sx={{ mb: 10 }}>
        <Typography 
          variant="h4" 
          align="center"
          sx={{ mb: 4 }}
        >
          Our Technology
        </Typography>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          custom={0}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              bgcolor: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(148, 163, 184, 0.1)',
            }}
          >
            <Grid container spacing={4}>
              {[
                {
                  icon: <AutoFixHighIcon fontSize="large" />,
                  title: "Advanced Machine Learning",
                  description: "Our security analysis engine uses state-of-the-art machine learning algorithms to detect patterns and anomalies in code and network behavior."
                },
                {
                  icon: <PsychologyIcon fontSize="large" />,
                  title: "Natural Language Processing",
                  description: "The chatbot interface is built on sophisticated NLP models that understand security contexts and provide relevant responses."
                },
                {
                  icon: <WhatshotIcon fontSize="large" />,
                  title: "Real-time Threat Intelligence",
                  description: "We maintain connections to global threat intelligence databases to provide up-to-date information on emerging security risks."
                }
              ].map((tech, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        mx: 'auto',
                        mb: 2,
                        bgcolor: 'rgba(139, 92, 246, 0.1)', 
                        color: theme.palette.primary.main 
                      }}
                    >
                      {tech.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {tech.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tech.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
      </Box>

      {/* Footer Section */}
      <Box 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        sx={{ textAlign: 'center', mb: 4 }}
      >
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" gutterBottom>
          Join us in creating a more secure digital world
        </Typography>
        <Typography variant="body2" color="text.secondary">
          CyberGuard is committed to advancing cybersecurity through innovation, education, and accessible tools.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage; 