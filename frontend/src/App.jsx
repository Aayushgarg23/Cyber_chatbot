import { useState, useRef, useEffect } from "react";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper, 
  CssBaseline,
  Grid 
} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { auth } from './firebase/config';
import { signOut } from 'firebase/auth';
import axios from "axios";
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import ImageIcon from '@mui/icons-material/Image';
import FolderIcon from '@mui/icons-material/Folder';

// Theme
import { theme } from './theme';

// Pages
import HomePage from './components/HomePage';
import ChatInterface from './components/ChatInterface';
import WelcomeDialog from './components/WelcomeDialog';
import LoadingOverlay from './components/LoadingOverlay';
import FirebaseAuth from './components/FirebaseAuth';
import ConversationsList from './components/ConversationsList';

// Import pages if they exist in the project structure
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Layouts
// Change this line
import { MainLayout } from './layouts/MainLayout';  // Change from 'import MainLayout from ...'

// Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Only show welcome dialog on first visit to home page
    if (location.pathname === '/' && showWelcome) {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        setShowWelcome(true);
        localStorage.setItem('hasSeenWelcome', 'true');
      } else {
        setShowWelcome(false);
      }
    }
  }, [location, showWelcome]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSend = async (message, type = "text", file = null) => {
    if (!user && type !== "text") {
      alert("Login required to send images or folders.");
      return;
    }
  
    setMessages(prev => [...prev, { content: message, isUser: true, type }]);
  
    try {
      const response = await axios.post("/api/chat/", {
        message,
        type,
        file: file ? await convertFileToBase64(file) : null,
        isGuest: user?.isGuest
      });
  
      setMessages(prev => [...prev, {
        content: response.data.response,
        isUser: false,
        type: "text",
        severity: response.data.severity,
      }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        type: "text",
        severity: "error",
      }]);
    }
  };

  const handleLogout = async () => {
    try {
      if (!user?.isGuest) {
        await signOut(auth);
      }
      setUser(null);
      setMessages([]);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Private route component
  const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser || currentUser?.isGuest ? children : <Navigate to="/login" />;
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="tools" element={<ToolsPage />} />
            <Route
              path="chat"
              element={
                <ChatPage />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
