import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const FileAnalysis = ({ fileName, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Paper sx={{
        p: 2,
        bgcolor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
      }}>
        <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
          Analyzing: {fileName}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#8a2be2'
            }
          }}
        />
      </Paper>
    </motion.div>
  );
};

export default FileAnalysis;