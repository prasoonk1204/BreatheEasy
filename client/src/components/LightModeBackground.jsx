import React from 'react';
import { motion } from 'framer-motion';

// Motion components to satisfy linting
const MotionDiv = motion.div;

const LightModeBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Purple-themed light background */}
            {/* Purple-themed gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-violet-50 to-blue-50" />
      
      {/* Subtle animated elements */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [0.8, 1.1, 0.8],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-100 to-violet-100 rounded-full blur-3xl"
      />
      
      <MotionDiv
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          scale: [0.9, 1.2, 0.9],
          x: [0, -20, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute top-1/2 right-20 w-80 h-80 bg-gradient-to-l from-emerald-100 to-green-100 rounded-full blur-3xl"
      />
      
      <MotionDiv
        initial={{ opacity: 0, scale: 1 }}
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -40, 0]
        }}
        transition={{ 
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8
        }}
        className="absolute bottom-20 left-1/3 w-60 h-60 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-3xl"
      />
    </div>
  );
};

export default LightModeBackground;