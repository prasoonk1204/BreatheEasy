import React from 'react';
import { motion } from 'framer-motion';

// Motion components to satisfy linting
const MotionDiv = motion.div;

const DarkModeBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep purple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950" />
      
      {/* Subtle animated elements */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [0.5, 1.2, 0.5],
          x: [0, -40, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-900/20 to-violet-900/20 rounded-full blur-3xl"
      />
      
      <MotionDiv
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [0.7, 1.1, 0.7],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-1/4 left-10 w-72 h-72 bg-gradient-to-l from-emerald-800/20 to-green-800/20 rounded-full blur-3xl"
      />
      
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [0.8, 1.3, 0.8],
          x: [0, -30, 0],
          y: [0, 40, 0]
        }}
        transition={{ 
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7
        }}
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-tr from-blue-800/15 to-indigo-800/15 rounded-full blur-3xl"
      />
    </div>
  );
};

export default DarkModeBackground;