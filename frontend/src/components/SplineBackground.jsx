import { Suspense } from 'react';
import { Box } from '@mui/material';
import Spline from "@splinetool/react-spline";

const SplineBackground = () => {
  return (
    <Box sx={{ 
      position: 'fixed', 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      overflow: 'hidden'
    }}>
      <Suspense fallback={
        <Box sx={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
        }} />
      }>
        <Spline 
          scene="https://prod.spline.design/gnjjIpIjQ0SCkjY2/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </Box>
  );
};

export default SplineBackground;