import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Chip, 
  IconButton, 
  Avatar,
  Tooltip,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Message = ({ message }) => {
  const { content, isUser, type, severity } = message;
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityIcon = () => {
    switch (severity) {
      case 'error': 
        return <ErrorIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
      case 'warning': 
        return <WarningAmberIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      case 'info': 
        return <InfoIcon fontSize="small" sx={{ color: theme.palette.info.main }} />;
      default: 
        return null;
    }
  };

  const getSeverityColor = () => {
    switch (severity) {
      case 'error': return theme.palette.error.main;
      case 'warning': return theme.palette.warning.main;
      case 'info': return theme.palette.info.main;
      default: return null;
    }
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 500,
        damping: 30,
        mass: 1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={messageVariants}
    >
      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: isUser ? 'row-reverse' : 'row', 
          mb: 2,
          alignItems: 'flex-start',
          gap: 2,
          width: '100%'
        }}
      >
        <Avatar
          src={!isUser ? "https://res.cloudinary.com/dv9iswy2f/image/upload/v1744041911/images__5_-removebg-preview_1_yu50if.png" : undefined}
          sx={{ 
            bgcolor: isUser ? theme.palette.secondary.main : 'transparent',
            boxShadow: isUser 
              ? `0 0 10px rgba(59, 130, 246, 0.3)`
              : `0 0 10px rgba(139, 92, 246, 0.3)`,
            mt: 1,
            width: 40,
            height: 40
          }}
        >
          {isUser && <PersonIcon />}
        </Avatar>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            maxWidth: '75%',
            borderRadius: isUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
            bgcolor: isUser 
              ? 'rgba(59, 130, 246, 0.1)'
              : 'rgba(139, 92, 246, 0.1)',
            border: '1px solid',
            borderColor: isUser 
              ? 'rgba(59, 130, 246, 0.2)'
              : 'rgba(139, 92, 246, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            ml: isUser ? 'auto' : 0,
            mr: isUser ? 0 : 'auto',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 15,
              [isUser ? 'right' : 'left']: -10,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: isUser 
                ? '10px 10px 10px 0' 
                : '10px 0 10px 10px',
              borderColor: isUser 
                ? `transparent rgba(59, 130, 246, 0.2) transparent transparent`
                : `transparent transparent transparent rgba(139, 92, 246, 0.2)`,
              transform: isUser ? 'rotate(180deg)' : 'none'
            }
          }}
        >
          {(severity || getSeverityIcon()) && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1,
              pb: 1,
              borderBottom: '1px solid',
              borderColor: getSeverityColor() 
                ? `${getSeverityColor()}33` 
                : theme.palette.divider
            }}>
              {getSeverityIcon()}
              <Typography variant="caption" sx={{ 
                ml: 1,
                color: getSeverityColor() || 'text.secondary',
                fontWeight: 500
              }}>
                {severity?.toUpperCase() || 'NOTE'}
              </Typography>
            </Box>
          )}

          <Typography variant="body1" sx={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            color: isUser ? 'primary.main' : 'secondary.main'
          }}>
            {content}
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
            pt: 1,
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              {new Date().toLocaleTimeString()}
            </Typography>

            <Tooltip title={copied ? "Copied!" : "Copy text"}>
              <IconButton 
                size="small" 
                onClick={handleCopy}
                sx={{ 
                  opacity: 0.6,
                  '&:hover': { opacity: 1 },
                  color: copied ? theme.palette.success.main : 'inherit'
                }}
              >
                {copied ? <DoneIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};

export default Message;