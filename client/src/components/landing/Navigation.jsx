import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <motion.img
              src="/favicon.png"
              alt="Logo"
              className="w-8 h-8"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              whileHover={{ scale: 1.1, rotate: 20 }}
            />
            <motion.h1
              className="text-2xl font-bold text-emerald-600 dark:text-green-400 notranslate"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              BreatheEasy
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-green-400 dark:border-green-600 bg-white dark:bg-green-800 text-green-800 dark:text-white"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1, rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {theme === "dark" ? (
                <motion.span
                  className="w-5 h-5 text-yellow-400"
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Sun className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  className="w-5 h-5 text-blue-600"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Moon className="w-5 h-5" />
                </motion.span>
              )}
            </motion.button>

            <Link
              to="/dashboard"
              className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 items-center gap-2 hover:scale-105 hover:shadow-lg group"
            >
              Launch App
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
