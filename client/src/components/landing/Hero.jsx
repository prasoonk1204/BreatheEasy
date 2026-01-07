import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, ArrowRight, Github } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center z-20 relative">
          <div className="mb-8">
            <div
              className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-green-800 text-emerald-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up animate-delay-200"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <Globe className="w-4 h-4 animate-spin" />
              Open Source Air Quality Monitor
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Monitor Air Quality
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="block text-emerald-600 dark:text-green-400 bg-linear-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text"
            >
              Anywhere, Anytime
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
            className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Get real-time air quality data, health suggestions, and detailed
            pollutant analysis for any city around the world. Make informed
            decisions for better health.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/dashboard"
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 animate-bounce-subtle group"
            >
              Start Monitoring
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <a
              href="https://github.com/prasoonk1204/BreatheEasy"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-emerald-600 dark:hover:border-green-400 hover:bg-emerald-50 dark:hover:bg-green-900/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              View on GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 dark:bg-green-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          style={{ y: scrollY * 0.03, x: scrollY * 0.05 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          style={{
            transform: `translate(${-scrollY * 0.04}px, ${scrollY * 0.06}px)`,
          }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          style={{
            transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.04}px)`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
