import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, Wind, Leaf, Sparkles } from 'lucide-react';

const ToastNotification = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgLight: 'bg-gradient-to-r from-emerald-50 to-green-50',
      bgDark: 'dark:from-emerald-900/30 dark:to-green-900/30',
      border: 'border-emerald-400 dark:border-emerald-600',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      glow: 'shadow-emerald-500/50'
    },
    info: {
      icon: Info,
      bgLight: 'bg-gradient-to-r from-blue-50 to-cyan-50',
      bgDark: 'dark:from-blue-900/30 dark:to-cyan-900/30',
      border: 'border-blue-400 dark:border-blue-600',
      iconColor: 'text-blue-600 dark:text-blue-400',
      glow: 'shadow-blue-500/50'
    },
    warning: {
      icon: AlertTriangle,
      bgLight: 'bg-gradient-to-r from-amber-50 to-yellow-50',
      bgDark: 'dark:from-amber-900/30 dark:to-yellow-900/30',
      border: 'border-amber-400 dark:border-amber-600',
      iconColor: 'text-amber-600 dark:text-amber-400',
      glow: 'shadow-amber-500/50'
    },
    air: {
      icon: Wind,
      bgLight: 'bg-gradient-to-r from-emerald-50 to-teal-50',
      bgDark: 'dark:from-emerald-900/30 dark:to-teal-900/30',
      border: 'border-teal-400 dark:border-teal-600',
      iconColor: 'text-teal-600 dark:text-teal-400',
      glow: 'shadow-teal-500/50'
    },
    eco: {
      icon: Leaf,
      bgLight: 'bg-gradient-to-r from-green-50 to-lime-50',
      bgDark: 'dark:from-green-900/30 dark:to-lime-900/30',
      border: 'border-green-400 dark:border-green-600',
      iconColor: 'text-green-600 dark:text-green-400',
      glow: 'shadow-green-500/50'
    }
  };

  const { icon: Icon, bgLight, bgDark, border, iconColor, glow } = config[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`
            fixed top-20 right-4 z-[9999] max-w-md
            ${bgLight} ${bgDark} backdrop-blur-md
            border-2 ${border} rounded-2xl shadow-2xl ${glow}
            p-4 cursor-pointer group
          `}
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose && onClose(), 300);
          }}
        >
          <div className="flex items-start gap-3">
            {/* Animated Icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className={`${iconColor} flex-shrink-0`}
            >
              <Icon className="w-6 h-6" />
            </motion.div>

            {/* Message */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {message}
              </p>
            </div>

            {/* Sparkle effect */}
            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="text-yellow-400"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
