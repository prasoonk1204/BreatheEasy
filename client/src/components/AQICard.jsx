import React from "react";
import { motion } from "framer-motion";
import { Activity, Clock, TrendingUp, TrendingDown } from "lucide-react";

const getAQIDescription = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
};

const getCardColor = (aqi) => {
  if (aqi <= 50)
    return {
      bg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      shadow: "shadow-emerald",
      glow: "hover:shadow-emerald",
      text: "text-white font-medium",
      icon: "text-emerald-100"
    };
  if (aqi <= 100)
    return {
      bg: "bg-gradient-to-br from-amber-400 to-amber-600",
      shadow: "shadow-amber-400",
      glow: "hover:shadow-amber-400",
      text: "text-gray-900 font-medium",
      icon: "text-amber-100"
    };
  if (aqi <= 200)
    return {
      bg: "bg-gradient-to-br from-orange-400 to-orange-600",
      shadow: "shadow-orange-400",
      glow: "hover:shadow-orange-400",
      text: "text-white",
      icon: "text-orange-100"
    };
  if (aqi <= 300)
    return {
      bg: "bg-gradient-to-br from-red-500 to-red-700",
      shadow: "shadow-red-500",
      glow: "hover:shadow-red-500",
      text: "text-white",
      icon: "text-red-100"
    };
  if (aqi <= 400)
    return {
      bg: "bg-gradient-to-br from-red-700 to-red-900",
      shadow: "shadow-red-700",
      glow: "hover:shadow-red-700",
      text: "text-white",
      icon: "text-red-100"
    };
  return {
    bg: "bg-gradient-to-br from-gray-800 to-gray-900",
    shadow: "shadow-gray-800",
    glow: "hover:shadow-gray-800",
    text: "text-white",
    icon: "text-gray-300"
  };
};

const getHealthMessage = (aqi) => {
  if (aqi <= 50) return "Air quality is considered safe";
  if (aqi <= 100) return "Acceptable for most people";
  if (aqi <= 200) return "Sensitive groups may experience issues";
  if (aqi <= 300) return "Everyone may begin to experience health effects";
  if (aqi <= 400) return "Health alert: everyone may experience effects";
  return "Health warning: emergency conditions";
};

const AQICard = ({ aqi, time }) => {
  const colors = getCardColor(aqi);
  const formattedTime = time ? new Date(time).toLocaleString() : "N/A";
  const healthMessage = getHealthMessage(aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`
        relative rounded-3xl p-8 ${colors.bg} ${colors.shadow}
        hover:shadow-2xl transition-all duration-500 group overflow-hidden
        border border-white/20 backdrop-blur-sm
      `}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border-4 border-white/30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`p-3 rounded-full bg-white/20 ${colors.icon}`}
            >
              <Activity size={24} />
            </motion.div>
            <h3 className={`text-xl font-display ${colors.text}`}>
              Current AQI
            </h3>
          </div>
          
          {/* Trend indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-2 rounded-full bg-white/20 ${colors.icon}`}
          >
            {aqi <= 100 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
          </motion.div>
        </div>

        {/* AQI Value */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-center mb-6"
        >
          <div className={`text-6xl font-display font-black ${colors.text} leading-none tracking-tight`}>
            {aqi}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-2xl font-medium ${colors.text} mt-2`}
          >
            {getAQIDescription(aqi)}
          </motion.div>
        </motion.div>

        {/* Health Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-sm ${colors.text} text-center mb-4 opacity-90`}
        >
          {healthMessage}
        </motion.div>

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`flex items-center justify-center gap-2 text-xs ${colors.text} opacity-80`}
        >
          <Clock size={12} />
          <span>Last updated: {formattedTime}</span>
        </motion.div>
      </div>

      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl border-2 border-white/40 opacity-0 group-hover:opacity-100"
        initial={false}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

export default AQICard;
