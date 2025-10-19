// src/components/Sidebar.jsx
import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Globe2,
  Sun, 
  Moon, 
  PanelLeft,
  Home,
  Sparkles
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, color: "emerald" },
  { name: "Explore AQI", path: "/dashboard/explore-aqi", icon: Globe2, color: "blue" },
  { name: "Air Quality Forecast", path: "/dashboard/chart", icon: BarChart3, color: "purple" },
  { name: "Precautions", path: "/dashboard/precautions", icon: ShieldCheck, color: "orange" },
  { name: "Improvement", path: "/dashboard/improvement", icon: TrendingUp, color: "green" },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500",
    bgHover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
    shadow: "shadow-emerald",
    gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600"
  },
  blue: {
    bg: "bg-blue-500",
    bgHover: "hover:bg-blue-100 dark:hover:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    shadow: "shadow-sky",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  purple: {
    bg: "bg-purple-500",
    bgHover: "hover:bg-purple-100 dark:hover:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    shadow: "shadow-purple",
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  orange: {
    bg: "bg-orange-500",
    bgHover: "hover:bg-orange-100 dark:hover:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    shadow: "shadow-orange",
    gradient: "bg-gradient-to-r from-orange-500 to-orange-600"
  },
  green: {
    bg: "bg-green-500",
    bgHover: "hover:bg-green-100 dark:hover:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    shadow: "shadow-green",
    gradient: "bg-gradient-to-r from-green-500 to-green-600"
  }
};

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const linkRefs = useRef([]);

  const handleLinkClick = (idx) => {
    const ref = linkRefs.current[idx];
    if (ref) {
      ref.classList.add("animate-pulse-glow");
      setTimeout(() => {
        ref.classList.remove("animate-pulse-glow");
      }, 600);
    }
  };

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        hidden lg:flex flex-col justify-between fixed top-0 left-0 h-screen z-40
        transition-all duration-500 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
        card-glass backdrop-blur-xl border-r border-white/20 dark:border-gray-700/30
      `}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent dark:from-gray-800/10 pointer-events-none rounded-l-2xl" />
      
      <div className="flex-1 relative z-10">
        {/* Header section */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between p-4 border-b border-white/10 dark:border-gray-700/30"
        >
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <img src="/favicon.png" alt="Logo" className="w-10 h-10 animate-float" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-2 h-2 text-white" />
                  </motion.div>
                </div>
                <Link 
                  to="/" 
                  className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
                >
                  BreatheEasy
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 transition-all duration-200 group focus-ring"
            aria-label="Toggle sidebar"
          >
            <PanelLeft
              size={20}
              className={`transition-transform duration-300 group-hover:text-emerald-500 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </motion.button>
        </motion.div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {links.map((link, idx) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            const colors = colorClasses[link.color];
            
            return (
              <motion.div
                key={link.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <Link
                  ref={(el) => (linkRefs.current[idx] = el)}
                  to={link.path}
                  onClick={() => handleLinkClick(idx)}
                  className={`
                    group flex items-center gap-3 p-3 rounded-xl font-medium relative
                    transition-all duration-200 hover-lift focus-ring
                    ${isActive 
                      ? `${colors.gradient} text-white shadow-lg` 
                      : `text-gray-700 dark:text-gray-300 ${colors.bgHover}`
                    }
                    ${collapsed ? "justify-center" : ""}
                  `}
                  aria-label={collapsed ? link.name : undefined}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                      ${isActive ? "text-white" : colors.text}
                      transition-colors duration-200
                    `}
                  >
                    <Icon size={collapsed ? 24 : 20} />
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm whitespace-nowrap"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active indicator */}
                  {isActive && !collapsed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}

                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {link.name}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-white"></div>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Footer section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="p-4 border-t border-white/10 dark:border-gray-700/30 space-y-3"
      >
        {/* Back to Landing Page */}
        <Link
          to="/"
          className={`
            group flex items-center gap-3 p-3 rounded-xl font-medium relative
            text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-800/50
            transition-all duration-200 hover-lift focus-ring
            ${collapsed ? "justify-center" : ""}
          `}
          aria-label={collapsed ? "Back to Home" : undefined}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 dark:text-gray-400 group-hover:text-emerald-500 transition-colors duration-200"
          >
            <Home size={collapsed ? 24 : 20} />
          </motion.div>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap"
              >
                Back to Home
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Back to Home
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-white"></div>
            </div>
          )}
        </Link>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`
            w-full group flex items-center gap-3 p-3 rounded-xl font-medium relative
            bg-gradient-to-r from-emerald-500/10 to-sky-500/10 hover:from-emerald-500/20 hover:to-sky-500/20
            border border-emerald-200/20 dark:border-emerald-400/20
            transition-all duration-200 focus-ring
            ${collapsed ? "justify-center" : ""}
          `}
          aria-label={collapsed ? "Toggle theme" : undefined}
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="text-emerald-600 dark:text-emerald-400"
          >
            {theme === 'dark' ? (
              <Sun size={collapsed ? 24 : 20} />
            ) : (
              <Moon size={collapsed ? 24 : 20} />
            )}
          </motion.div>
          
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm whitespace-nowrap text-emerald-700 dark:text-emerald-300"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-white"></div>
            </div>
          )}
        </motion.button>
      </motion.div>
    </motion.aside>
  );
}