import { Box, Drawer, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

const ChatHistory = ({ open, onClose, messages, onClearHistory }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ 
        width: 320, 
        bgcolor: 'rgba(13,17,23,0.95)',
        height: '100%',
        backdropFilter: 'blur(10px)'
      }}>
        <Box sx={{ 
          p: 2, 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Chat History
          </Typography>
          <IconButton onClick={onClearHistory} sx={{ color: 'white' }}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <List sx={{ p: 0 }}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItem sx={{ 
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
              }}>
                <ListItemText
                  primary={msg.isUser ? 'You' : 'Assistant'}
                  secondary={msg.content.substring(0, 50) + '...'}
                  sx={{
                    '& .MuiListItemText-primary': { color: 'white' },
                    '& .MuiListItemText-secondary': { color: 'rgba(255,255,255,0.7)' }
                  }}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default ChatHistory;