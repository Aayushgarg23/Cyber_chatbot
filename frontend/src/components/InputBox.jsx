import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Chip, 
  Stack, 
  Tooltip, 
  Typography, 
  LinearProgress, 
  useTheme,
  Badge,
  Paper
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardIcon from '@mui/icons-material/Keyboard';

const InputBox = ({ onSend, user }) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    "How can I secure my Wi-Fi network?",
    "What are common phishing techniques?",
    "Analyze my password strength",
    "Best practices for secure coding",
    "Explain recent security vulnerabilities"
  ];

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const handleSend = async () => {
    if (message.trim() || selectedFile) {
      setIsSending(true);
      await onSend(message, selectedFile ? 'file' : 'text', selectedFile);
      setMessage('');
      setSelectedFile(null);
      setIsSending(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleVoiceInput = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          setSelectedFile(new File([blob], 'voice-message.webm', { type: 'audio/webm' }));
          // Stop tracks after recording
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } else {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;
    
    const fileType = selectedFile.type.split('/')[0];
    switch (fileType) {
      case 'image':
        return <ImageIcon />;
      case 'audio':
        return <MicIcon />;
      case 'text':
        return <DescriptionIcon />;
      case 'application':
        if (selectedFile.name.endsWith('.js') || 
            selectedFile.name.endsWith('.py') || 
            selectedFile.name.endsWith('.html') || 
            selectedFile.name.endsWith('.css')) {
          return <CodeIcon />;
        }
        return <DescriptionIcon />;
      default:
        return <AttachFileIcon />;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip
                icon={getFileIcon()}
                label={selectedFile.name}
                onDelete={() => setSelectedFile(null)}
                deleteIcon={<CloseIcon />}
                sx={{
                  bgcolor: 'rgba(139, 92, 246, 0.1)',
                  color: theme.palette.text.primary,
                  borderRadius: '12px',
                  py: 0.5,
                  '& .MuiChip-icon': {
                    color: theme.palette.primary.main,
                  },
                  '& .MuiChip-deleteIcon': {
                    color: theme.palette.text.secondary,
                    '&:hover': { color: theme.palette.error.main }
                  }
                }}
              />
            </Stack>
          </motion.div>
        )}

        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                mb: 1,
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <Box sx={{ 
                width: 10, 
                height: 10, 
                borderRadius: '50%', 
                bgcolor: theme.palette.error.main,
                animation: 'pulse 1.5s infinite'
              }} />
              <Typography variant="body2" color="error">
                Recording... {formatTime(recordingTime)}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress 
                  color="error" 
                  variant="determinate" 
                  value={(recordingTime % 60) * (100/60)} 
                  sx={{ height: 4, borderRadius: 2 }}
                />
              </Box>
              <IconButton size="small" onClick={handleVoiceInput} color="error">
                <StopIcon fontSize="small" />
              </IconButton>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Box sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          onKeyPress={handleKeyPress}
          placeholder={isRecording ? "Recording voice message..." : (selectedFile ? "Add a message with your file..." : "Type your message...")}
          inputRef={inputRef}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: theme.palette.text.primary,
              bgcolor: 'rgba(15, 23, 42, 0.3)',
              borderRadius: '16px',
              transition: 'all 0.3s ease',
              pr: 11, // Make room for buttons
              '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.2)' },
              '&:hover fieldset': { borderColor: 'rgba(139, 92, 246, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }
            }
          }}
          InputProps={{
            endAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute', 
                  right: 8, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  display: 'flex', 
                  gap: 0.5 
                }}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                {!user?.isGuest && (
                  <>
                    <Tooltip title="Attach file">
                      <IconButton
                        size="small"
                        onClick={() => fileInputRef.current.click()}
                        sx={{ 
                          color: theme.palette.text.secondary,
                          '&:hover': { color: theme.palette.primary.main }
                        }}
                      >
                        <AttachFileIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={isRecording ? "Stop recording" : "Voice message"}>
                      <IconButton
                        size="small"
                        onClick={handleVoiceInput}
                        sx={{ 
                          color: isRecording ? theme.palette.error.main : theme.palette.text.secondary,
                          animation: isRecording ? 'pulse 1.5s infinite' : 'none',
                          '&:hover': { 
                            color: isRecording ? theme.palette.error.dark : theme.palette.primary.main 
                          }
                        }}
                      >
                        {isRecording ? <StopIcon fontSize="small" /> : <MicIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                <Box sx={{ mx: 0.5, height: 24, borderLeft: '1px solid', borderColor: 'divider' }} />
                <Tooltip title="Send message">
                  <span>
                    <IconButton
                      size="small"
                      onClick={handleSend}
                      disabled={(!message.trim() && !selectedFile) || isSending}
                      sx={{
                        color: 'white',
                        bgcolor: theme.palette.primary.main,
                        '&:hover': { bgcolor: theme.palette.primary.dark },
                        '&.Mui-disabled': { 
                          bgcolor: 'rgba(148, 163, 184, 0.2)', 
                          color: 'rgba(255, 255, 255, 0.3)'
                        },
                        transition: 'all 0.3s ease',
                        transform: message.trim() || selectedFile ? 'scale(1)' : 'scale(0.9)',
                      }}
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            )
          }}
        />

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && !message.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: 0,
                width: '100%',
                marginBottom: '8px',
                zIndex: 10,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 1,
                  bgcolor: 'rgba(30, 41, 59, 0.95)',
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, px: 1 }}>
                  <AutoAwesomeIcon fontSize="small" sx={{ color: theme.palette.warning.main, mr: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Suggested questions:
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, px: 1 }}>
                  {suggestions.map((suggestion, index) => (
                    <Chip
                      key={index}
                      label={suggestion}
                      size="small"
                      icon={<KeyboardIcon sx={{ fontSize: '0.7rem !important' }} />}
                      onClick={() => {
                        setMessage(suggestion);
                        setShowSuggestions(false);
                        setTimeout(() => handleSend(), 100);
                      }}
                      sx={{
                        bgcolor: 'rgba(139, 92, 246, 0.1)',
                        color: theme.palette.text.primary,
                        borderRadius: '12px',
                        '&:hover': {
                          bgcolor: 'rgba(139, 92, 246, 0.2)',
                        },
                        '& .MuiChip-icon': {
                          color: theme.palette.primary.light,
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {isSending && (
        <Box sx={{ width: '100%', mt: 1 }}>
          <LinearProgress 
            color="primary" 
            sx={{ 
              height: 2, 
              borderRadius: 1,
              '& .MuiLinearProgress-bar': {
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }
            }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default InputBox;
