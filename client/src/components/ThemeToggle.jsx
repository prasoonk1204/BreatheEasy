import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

// Motion components
const MotionButton = motion.button;
const MotionDiv = motion.div;

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <MotionButton
      onClick={toggleTheme}
      className={`
        relative p-3 rounded-full overflow-hidden
        bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-800 dark:to-indigo-800
        border-2 border-purple-200 dark:border-purple-700
        shadow-lg hover:shadow-xl
        transition-all duration-500 ease-out
        group focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-600
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient animation */}
      <MotionDiv
        className="absolute inset-0 bg-gradient-to-r from-purple-200 to-violet-200 dark:from-emerald-800 dark:to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        layoutId="theme-bg"
      />
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        <MotionDiv
          key={theme}
          initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 180, scale: 0.5 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20,
            duration: 0.5
          }}
          className="absolute"
        >
          {isDark ? (
            <Moon 
              size={20} 
              className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 drop-shadow-sm" 
            />
          ) : (
            <Sun 
              size={20} 
              className="text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300 drop-shadow-sm" 
            />
          )}
        </MotionDiv>
        
        {/* Sparkle effects */}
        <MotionDiv
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-0 right-0 transform translate-x-1 -translate-y-1"
        >
          <Sparkles size={8} className="text-emerald-400 dark:text-purple-400 opacity-60" />
        </MotionDiv>
      </div>
      
      {/* Ripple effect on click */}
      <MotionDiv
        className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-full"
        initial={false}
        animate={{ scale: 0, opacity: 1 }}
        whileTap={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Border glow effect */}
      <MotionDiv
        className="absolute inset-0 rounded-full border-2 border-emerald-300 dark:border-purple-400 opacity-0 group-hover:opacity-50"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </MotionButton>
  );
};

export default ThemeToggle;