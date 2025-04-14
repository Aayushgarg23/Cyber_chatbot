import { 
  Button, 
  TextField, 
  Typography, 
  Paper,
  Box,
  Tabs,
  Tab,
  Alert,
  Divider 
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const FirebaseAuth = ({ onLogin }) => {
  const [authMethod, setAuthMethod] = useState('email');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleEmailLogin = async () => {
    try {
      setError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      onLogin(userCredential.user);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          onLogin(userCredential.user);
        } catch (signupError) {
          setError(signupError.message);
        }
      } else {
        setError(error.message);
      }
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handlePhoneLogin = async () => {
    try {
      setError('');
      setupRecaptcha();
      const formattedPhone = `+${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth, 
        formattedPhone,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
      setShowOTPInput(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      setError('');
      const result = await window.confirmationResult.confirm(verificationCode);
      onLogin(result.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 400, 
      width: '100%',
      p: 4,
      bgcolor: 'rgba(15, 23, 42, 0.6)',
      borderRadius: 2,
      backdropFilter: 'blur(10px)'
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box sx={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          bgcolor: 'rgba(139, 92, 246, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2
        }}>
          <LockIcon sx={{ fontSize: 32, color: '#8B5CF6' }} />
        </Box>
        <Typography variant="h5" sx={{ 
          color: '#F8FAFC',
          fontWeight: 600,
          textAlign: 'center'
        }}>
          Welcome Back
        </Typography>
      </Box>

      <div id="recaptcha-container"></div>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Tabs
        value={authMethod}
        onChange={(e, v) => setAuthMethod(v)}
        sx={{ mb: 3 }}
      >
        <Tab value="email" label="Email" />
        <Tab value="phone" label="Phone" />
      </Tabs>

      {authMethod === 'email' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleEmailLogin}
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #8a2be2, #4169e1)',
            }}
          >
            Login / Sign Up
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <PhoneInput
            country={'in'}
            value={phoneNumber}
            onChange={setPhoneNumber}
            containerStyle={{ marginBottom: 24 }}
          />
          {showOTPInput ? (
            <>
              <TextField
                fullWidth
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                onClick={verifyOTP}
                sx={{
                  mb: 2,
                  background: 'linear-gradient(45deg, #8a2be2, #4169e1)',
                }}
              >
                Verify Code
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={handlePhoneLogin}
              sx={{
                mb: 2,
                background: 'linear-gradient(45deg, #8a2be2, #4169e1)',
              }}
            >
              Send Verification Code
            </Button>
          )}
        </motion.div>
      )}

      <Divider sx={{ 
        my: 2 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          OR
        </Typography>
      </Divider>

      <Button
        fullWidth
        variant="outlined"
        onClick={() => onLogin({ isGuest: true })}
        sx={{
          color: 'white',
          borderColor: 'rgba(255,255,255,0.3)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.5)',
            bgcolor: 'rgba(255,255,255,0.05)'
          }
        }}
      >
        Continue without Login
      </Button>
    </Box>
  );
};

export default FirebaseAuth;