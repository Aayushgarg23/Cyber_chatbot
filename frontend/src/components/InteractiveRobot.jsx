import { Box } from '@mui/material';
import Spline from '@splinetool/react-spline';

const InteractiveRobot = () => {
  return (
    <Box sx={{ 
      width: '100%', 
      height: '500px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Spline 
        scene="https://prod.spline.design/s-j5jNSd8tcMVAPo/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </Box>
  );
};

export default InteractiveRobot;