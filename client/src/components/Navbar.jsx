// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Explore AQI", path: "/dashboard/explore-aqi" },
  { name: "Air Quality Forecast", path: "/dashboard/chart" },
  { name: "Precautions", path: "/dashboard/precautions" },
  { name: "Improvement", path: "/dashboard/improvement" },
];

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const location = useLocation();

  const mobileNavLinkClass = (path) =>
    `block w-full text-left px-4 py-3 rounded-xl transition-all font-medium text-lg group relative overflow-hidden
    ${location.pathname === path
      ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-purple"
      : "text-purple-800 hover:bg-purple-50 dark:text-purple-100 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400"
    }`;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="lg:hidden sticky top-0 z-[10000] flex items-center justify-between px-6 py-4 shadow-lg transition-all backdrop-blur-xl card-glass border-b border-white/20 dark:border-gray-700/30"
    >
      {/* Logo and brand */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <div className="relative">
          <img src="/favicon.png" alt="Logo" className="w-8 h-8 animate-float" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-1.5 h-1.5 text-white" />
          </motion.div>
        </div>
        <Link 
          to="/" 
          className="text-2xl font-medium bg-gradient-to-r from-purple-600 to-emerald-500 dark:from-purple-400 dark:to-emerald-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
        >
          BreatheEasy
        </Link>
      </motion.div>

      {/* Controls */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-center gap-3"
      >
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Menu toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 transition-all duration-200 focus-ring group"
          aria-label="Toggle mobile menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-purple-800 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full z-[10000] card-glass backdrop-blur-xl border-l border-orange-200/30 dark:border-zinc-700/30 bg-gradient-to-b from-orange-50/90 to-amber-50/90 dark:from-stone-900/90 dark:to-zinc-900/90"
          >
            {/* Menu header */}
            <div className="p-6 border-b border-orange-200/20 dark:border-zinc-700/30">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-heading text-stone-900 dark:text-stone-100">Navigation</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-gray-800/30 dark:hover:bg-gray-700/40 transition-all duration-200 focus-ring"
                  aria-label="Close mobile menu"
                >
                  <X size={20} className="text-gray-800 dark:text-white" />
                </motion.button>
              </div>
            </div>

            {/* Menu content */}
            <div className="p-6 flex flex-col h-full justify-between">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-3"
              >
                {links.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <Link
                      to={link.path}
                      className={mobileNavLinkClass(link.path)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.name}
                      </motion.span>
                      {location.pathname === link.path && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="pt-6 border-t border-white/10 dark:border-gray-700/30"
              >
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Made with ❤️ for clean air
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <img src="/favicon.png" alt="Logo" className="w-6 h-6" />
                    <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">
                      BreatheEasy
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;