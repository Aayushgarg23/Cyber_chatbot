import { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  TextField,
  IconButton,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TerminalIcon from '@mui/icons-material/Terminal';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import BugReportIcon from '@mui/icons-material/BugReport';
import SecurityIcon from '@mui/icons-material/Security';
import ShieldIcon from '@mui/icons-material/Shield';
import CodeIcon from '@mui/icons-material/Code';

const ToolsPage = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [file, setFile] = useState(null);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    // Handle file upload logic
    console.log("File to upload:", file);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const tabContent = [
    // Code Scanner
    <Box key="code-scanner" sx={{ py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload your code for security analysis
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Our AI will scan your code for potential security vulnerabilities, bad practices, 
        and suggest improvements based on industry standards.
      </Typography>
      
      <Paper
        variant="outlined"
        sx={{
          mt: 3,
          p: 3,
          border: '2px dashed rgba(148, 163, 184, 0.3)',
          borderRadius: 2,
          textAlign: 'center',
          bgcolor: 'rgba(15, 23, 42, 0.2)',
        }}
      >
        <input
          type="file"
          id="code-upload"
          hidden
          onChange={handleFileChange}
          accept=".js,.py,.java,.cpp,.c,.php,.html,.css"
        />
        <label htmlFor="code-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
            }}
          >
            Choose File
          </Button>
        </label>
        
        <Typography variant="body2" color="text.secondary">
          {file ? `Selected file: ${file.name}` : 'Supported formats: JS, Python, Java, C++, PHP, HTML, CSS'}
        </Typography>
        
        {file && (
          <Button
            variant="contained"
            onClick={handleFileUpload}
            sx={{ mt: 2 }}
          >
            Analyze Code
          </Button>
        )}
      </Paper>
    </Box>,
    
    // Vulnerability Scanner
    <Box key="vulnerability-scanner" sx={{ py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Scan for Vulnerabilities
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Enter a domain or IP address to scan for common security vulnerabilities and open ports.
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Domain or IP Address"
          placeholder="example.com or 192.168.1.1"
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(15, 23, 42, 0.2)',
            }
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<BugReportIcon />}
          sx={{
            background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
          }}
        >
          Start Scan
        </Button>
      </Box>
    </Box>,
    
    // Password Checker
    <Box key="password-checker" sx={{ py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Password Strength Checker
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Check if your password is strong enough against common attacks.
        Your password is not stored or transmitted anywhere.
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          type="password"
          label="Enter Password"
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(15, 23, 42, 0.2)',
            }
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<LockIcon />}
          sx={{
            background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
          }}
        >
          Check Strength
        </Button>
      </Box>
    </Box>,
    
    // Security Advisor
    <Box key="security-advisor" sx={{ py: 3 }}>
      <Typography variant="h6" gutterBottom>
        Security Best Practices
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Generate customized security recommendations for your organization or personal use.
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Describe your security needs"
          placeholder="e.g., I run a small e-commerce business with 5 employees..."
          variant="outlined"
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'rgba(15, 23, 42, 0.2)',
            }
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<ShieldIcon />}
          sx={{
            background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
          }}
        >
          Get Recommendations
        </Button>
      </Box>
    </Box>
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #fff, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Security Tools
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Powerful tools to help you identify vulnerabilities, strengthen your security posture,
            and protect your digital assets.
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Paper
              elevation={5}
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              <Tabs
                orientation="vertical"
                value={currentTab}
                onChange={handleTabChange}
                sx={{
                  borderRight: 1,
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    py: 2
                  },
                  '& .Mui-selected': {
                    color: theme.palette.primary.main
                  }
                }}
              >
                <Tab 
                  icon={<CodeIcon />} 
                  iconPosition="start" 
                  label="Code Scanner" 
                  sx={{ minHeight: 64 }}
                />
                <Tab 
                  icon={<BugReportIcon />} 
                  iconPosition="start" 
                  label="Vulnerability Scanner" 
                  sx={{ minHeight: 64 }}
                />
                <Tab 
                  icon={<LockIcon />} 
                  iconPosition="start" 
                  label="Password Checker" 
                  sx={{ minHeight: 64 }}
                />
                <Tab 
                  icon={<ShieldIcon />} 
                  iconPosition="start" 
                  label="Security Advisor" 
                  sx={{ minHeight: 64 }}
                />
              </Tabs>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Paper
              elevation={5}
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(30, 41, 59, 0.5)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
              }}
            >
              {tabContent[currentTab]}
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ToolsPage; 