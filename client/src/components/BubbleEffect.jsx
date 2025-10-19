import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Motion components
const MotionDiv = motion.div;

const BubbleEffect = ({ isDark = false, count = 15 }) => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: count }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 10,
        opacity: Math.random() * 0.4 + 0.1,
        color: isDark 
          ? ['cyan', 'purple', 'blue', 'indigo'][Math.floor(Math.random() * 4)]
          : ['pink', 'rose', 'fuchsia', 'purple'][Math.floor(Math.random() * 4)]
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, [count, isDark]);

  const getColorClasses = (color) => {
    const colorMap = {
      cyan: 'bg-gradient-to-br from-cyan-200/20 to-cyan-400/30 border-cyan-300/40',
      purple: 'bg-gradient-to-br from-purple-200/20 to-purple-400/30 border-purple-300/40',
      blue: 'bg-gradient-to-br from-blue-200/20 to-blue-400/30 border-blue-300/40',
      indigo: 'bg-gradient-to-br from-indigo-200/20 to-indigo-400/30 border-indigo-300/40',
      pink: 'bg-gradient-to-br from-pink-200/30 to-pink-400/40 border-pink-300/50',
      rose: 'bg-gradient-to-br from-rose-200/30 to-rose-400/40 border-rose-300/50',
      fuchsia: 'bg-gradient-to-br from-fuchsia-200/30 to-fuchsia-400/40 border-fuchsia-300/50'
    };
    return colorMap[color] || colorMap.pink;
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <MotionDiv
            key={bubble.id}
            initial={{
              x: `${bubble.x}vw`,
              y: '110vh',
              scale: 0,
              opacity: 0
            }}
            animate={{
              x: [`${bubble.x}vw`, `${bubble.x + Math.sin(bubble.id) * 20}vw`, `${bubble.x}vw`],
              y: ['-10vh', '-20vh'],
              scale: [0, 1, 0.8, 0],
              opacity: [0, bubble.opacity, bubble.opacity * 0.7, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1]
            }}
            className={`absolute rounded-full border backdrop-blur-sm ${getColorClasses(bubble.color)}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              filter: 'blur(0.5px)'
            }}
          >
            {/* Inner glow effect */}
            <div 
              className="absolute inset-2 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 70%)`
              }}
            />
            
            {/* Sparkle effect */}
            <MotionDiv
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: bubble.delay + 1
              }}
              className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"
            />
          </MotionDiv>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BubbleEffect;