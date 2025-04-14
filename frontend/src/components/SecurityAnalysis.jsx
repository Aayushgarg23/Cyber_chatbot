import { Box, Paper, Typography, Chip, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const SecurityAnalysis = ({ analysis }) => {
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return '#ff1744';
      case 'high': return '#f50057';
      case 'medium': return '#ff9100';
      case 'low': return '#00e676';
      default: return '#2979ff';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return <ErrorIcon />;
      case 'medium':
        return <WarningIcon />;
      default:
        return <SecurityIcon />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Paper sx={{
        p: 3,
        bgcolor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Security Analysis Report
          </Typography>
          <Chip
            icon={getSeverityIcon(analysis.severity)}
            label={analysis.severity}
            sx={{
              bgcolor: getSeverityColor(analysis.severity),
              color: 'white'
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
            Overall Security Score
          </Typography>
          <LinearProgress
            variant="determinate"
            value={analysis.score}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                bgcolor: getSeverityColor(analysis.severity)
              }
            }}
          />
        </Box>

        <Box>
          {analysis.findings.map((finding, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ color: 'white', mb: 1 }}>
                {finding.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                {finding.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default SecurityAnalysis;