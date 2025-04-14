import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Spline from "@splinetool/react-spline";

const Login = ({ onLogin, onSkip }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  // ... rest of your component code ...
};

export default Login;