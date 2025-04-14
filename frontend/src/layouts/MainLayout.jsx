import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box,  // Box is imported here, remove duplicate import below
  Container, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useMediaQuery,
  Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
// Add this import back or use a different icon
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SplineBackground from '../components/SplineBackground';
// Remove this duplicate import
// import { Box } from '@mui/material';

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { name: 'Home', path: '/', icon: <HomeIcon /> },
    { name: 'Chat', path: '/chat', icon: <ChatIcon /> },
    { name: 'Security Tools', path: '/tools', icon: <SecurityIcon /> }, // This line was causing the error
    { name: 'About', path: '/about', icon: <InfoIcon /> },
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      navigate('/');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        duration: 0.3 
      } 
    }
  };

  const listItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const drawer = (
    <Box sx={{ width: 250, mt: 2 }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <List>
          {pages.map((page) => (
            <motion.div key={page.path} variants={listItemVariants}>
              <ListItem 
                button 
                component={Link} 
                to={page.path}
                selected={location.pathname === page.path}
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  mx: 1,
                  backgroundColor: location.pathname === page.path ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: location.pathname === page.path ? theme.palette.primary.main : 'inherit'
                }}>
                  {page.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={page.name}
                  primaryTypographyProps={{
                    fontWeight: location.pathname === page.path ? 600 : 400
                  }}
                />
              </ListItem>
            </motion.div>
          ))}

          {currentUser && (
            <motion.div variants={listItemVariants}>
              <ListItem 
                button 
                onClick={handleLogout}
                sx={{
                  borderRadius: 2,
                  my: 0.5,
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: theme.palette.error.main }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </motion.div>
          )}
        </List>
      </motion.div>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      background: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Lg8SCZWtKE2FAON1sT3uLQfjHP_zKBF-Ug&s') no-repeat center center fixed`,
      backgroundSize: 'cover',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(5px)',
        zIndex: 0,
      }
    }}>
      {/* Header */}
      <AppBar position="static" sx={{ position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                mr: 2,
                flexGrow: { xs: 1, md: 0 },
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* Remove the SecurityIcon component */}
              CYBERGUARD
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={Link}
                  to={page.path}
                  sx={{ 
                    my: 2, 
                    mx: 1.5,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === page.path ? '100%' : '0%',
                      height: '3px',
                      bottom: 0,
                      left: 0,
                      backgroundColor: theme.palette.primary.main,
                      transition: 'width 0.3s ease'
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '&::after': {
                        width: '100%'
                      }
                    }
                  }}
                >
                  {page.icon}
                  <Box component="span" sx={{ ml: 1 }}>{page.name}</Box>
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {currentUser ? (
                <>
                  <Tooltip title={currentUser.isGuest ? 'Guest User' : currentUser.email || 'User'}>
                    <Avatar 
                      sx={{ 
                        bgcolor: theme.palette.primary.main,
                        boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      {currentUser.isGuest ? 'G' : currentUser.email?.[0].toUpperCase() || 'U'}
                    </Avatar>
                  </Tooltip>
                  
                  <IconButton 
                    onClick={handleLogout}
                    sx={{ 
                      ml: 2,
                      color: 'white',
                      '&:hover': { 
                        color: theme.palette.error.main
                      }
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </>
              ) : (
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/login"
                  sx={{
                    background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7C3AED, #2563EB)',
                      boxShadow: '0 6px 24px rgba(139, 92, 246, 0.4)',
                    }
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        PaperProps={{
          sx: { 
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            borderRight: '1px solid rgba(148, 163, 184, 0.1)'
          }
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" color="white" align="center">
            © 2024 CyberGuard. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

// Change the export statement at the bottom of the file
export { MainLayout };  // Change from 'export default MainLayout'