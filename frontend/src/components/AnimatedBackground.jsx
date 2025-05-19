import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';


export default function AnimatedBackground() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const createBubbles = () => {
      const newBubbles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 200 + 100,
        duration: Math.random() * 20 + 10,
      }));
      setBubbles(newBubbles);
    };

    createBubbles();
    window.addEventListener('resize', createBubbles);
    return () => window.removeEventListener('resize', createBubbles);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: -1 }}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          style={{
            position: 'absolute',
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(138,43,226,0) 70%)',
          }}
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
