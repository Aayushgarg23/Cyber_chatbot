import { useState } from 'react';
import { 
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ConversationsList = ({ onClose }) => {
  const [openFolders, setOpenFolders] = useState({});

  const sampleFolders = [
    {
      id: 1,
      name: 'Recent Conversations',
      conversations: [
        { id: 1, title: 'Password Security Discussion' },
        { id: 2, title: 'Malware Prevention Tips' }
      ]
    },
    {
      id: 2,
      name: 'Saved Conversations',
      conversations: [
        { id: 3, title: 'Network Security Basics' },
        { id: 4, title: 'Cybersecurity Best Practices' }
      ]
    }
  ];

  const handleFolderClick = (folderId) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Typography variant="h6">Chat History</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List component="nav">
        {sampleFolders.map((folder) => (
          <Box key={folder.id}>
            <ListItemButton onClick={() => handleFolderClick(folder.id)}>
              <ListItemIcon>
                {openFolders[folder.id] ? <FolderOpenIcon /> : <FolderIcon />}
              </ListItemIcon>
              <ListItemText primary={folder.name} />
              {openFolders[folder.id] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openFolders[folder.id]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {folder.conversations.map((conv) => (
                  <ListItemButton key={conv.id} sx={{ pl: 4 }}>
                    <ListItemText primary={conv.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ConversationsList;