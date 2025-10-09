import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  TrendingUp,
  Shield,
  Map,
  Sun,
  Moon,
  Users,
  Github,
  ExternalLink,
  ArrowRight,
  Activity,
  Wind,
  Eye,
  Calendar
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import ScrollToTop from '../components/ScrollToTop';
import ParticleBackground from '../components/ParticleBackground';
import WelcomePopup from '../components/WelcomePopup';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [isVisible, setIsVisible] = useState({});
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[id^="animate-"]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Live AQI Dashboard",
      description: "Real-time Air Quality Index monitoring with instant updates and current pollutant levels."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global City Search",
      description: "Search and explore air quality data from any city around the world with detailed insights."
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Interactive Maps",
      description: "Visualize AQI data on interactive maps with location-based air quality visualization."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Health Suggestions",
      description: "Get personalized health advice and precautions based on current air quality levels."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "7-Day Forecast",
      description: "Predict future air quality trends with interactive charts and forecasting data."
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Pollutant Breakdown",
      description: "Detailed analysis of PM2.5, PM10, O₃, NO₂, SO₂, and CO concentrations."
    }
  ];

  const contributors = [
    {
      name: "NirvikD",
      avatar: "https://avatars.githubusercontent.com/u/118150046?s=60&v=4",
      github: "https://github.com/NirvikD",
      commits: 9,
      linesAdded: 770,
    },
    {
      name: "deepanshu-prajapati01",
      avatar: "https://avatars.githubusercontent.com/u/98377377?s=60&v=4",
      github: "https://github.com/deepanshu-prajapati01",
      commits: 5,
      linesAdded: 312,
    },
    {
      name: "Kashish23092004",
      avatar: "https://avatars.githubusercontent.com/u/139871425?v=4",
      github: "https://github.com/Kashish23092004",
      commits: 4,
      linesAdded: 295,
    },
    {
      name: "gaurav123-4",
      avatar: "https://avatars.githubusercontent.com/u/204588730?s=60&v=4",
      github: "https://github.com/gaurav123-4",
      commits: 3,
      linesAdded: 723,
    },
    {
      name: "Mohamed-Fiyaz",
      avatar: "https://avatars.githubusercontent.com/u/124451741?v=4",
      github: "https://github.com/Mohamed-Fiyaz",
      commits: 2,
      linesAdded: 470,
    },
    {
      name: "Tanyasharma71",
      avatar: "https://avatars.githubusercontent.com/u/208266043?s=60&v=4",
      github: "https://github.com/Tanyasharma71",
      commits: 1,
      linesAdded: 21,
    },
    {
      name: "riya751885",
      avatar: "https://avatars.githubusercontent.com/u/122119293?s=60&v=4",
      github: "https://github.com/riya751885",
      commits: 1,
      linesAdded: 3,
    },
  ];

  const maintainer = {
    name: "prasoonk1204",
    avatar: "https://avatars.githubusercontent.com/u/171074534?s=60&v=4",
    github: "https://github.com/prasoonk1204",
    commits: 6,
    linesAdded: 2035
  };

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-indigo-950 transition-all duration-500 relative overflow-hidden">
      {/* Welcome Popup */}
      <WelcomePopup />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-slate-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-gray-300/10 to-blue-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-slate-200/5 to-gray-200/5 dark:from-slate-900/5 dark:to-gray-900/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 py-1 card-glass backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30">
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
                className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
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
                className="p-2 rounded-full border border-purple-400 dark:border-purple-500 bg-white dark:bg-purple-800 text-purple-800 dark:text-white"
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
                className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 items-center gap-2 hover:scale-105 hover:shadow-lg group"
              >
                Launch App
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-200 px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase mb-6"
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
              className="text-6xl lg:text-9xl font-black text-purple-900 dark:text-purple-100 mb-8 tracking-tighter leading-[0.85] font-display"
            >
              <span className="text-emerald-600 dark:text-emerald-400 block mb-2 font-light">Monitor</span>
              <span className="text-purple-900 dark:text-gray-100 font-extrabold">Air Quality</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, type: "spring", bounce: 0.4 }}
                className="block text-violet-600 dark:text-violet-300 font-extralight text-4xl lg:text-6xl mt-4 tracking-wider lowercase italic"
              >
                anywhere, anytime
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
              className="text-xl lg:text-2xl font-light text-purple-700 dark:text-purple-200 mb-12 max-w-4xl mx-auto leading-relaxed tracking-wide"
            >
              Get <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-tight">real-time air quality data</span>, 
              health suggestions, and detailed pollutant analysis for any city around the world. 
              <span className="text-violet-600 dark:text-violet-400 font-medium tracking-tight">Make informed decisions</span> for better health.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 dark:from-purple-500 dark:to-violet-500 dark:hover:from-purple-600 dark:hover:to-violet-600 text-white px-10 py-5 rounded-2xl font-semibold text-base tracking-wide uppercase transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                Start Monitoring
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <a
                href="https://github.com/prasoonk1204/BreatheEasy"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:border-emerald-600 dark:hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-10 py-5 rounded-2xl font-medium text-base tracking-wide uppercase transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                View on GitHub
              </a>
            </motion.div>
          </div>
        </div>

        {/* Background decoration with purple-green theme */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-purple-300/50 dark:bg-purple-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            style={{ y: scrollY * 0.03, x: scrollY * 0.05 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-emerald-300/50 dark:bg-emerald-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            style={{ transform: `translate(${-scrollY * 0.04}px, ${scrollY * 0.06}px)` }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300/50 dark:bg-blue-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            style={{ transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.04}px)` }}
          ></div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-purple-100/50 to-violet-100/50 dark:from-indigo-900/50 dark:to-purple-900/50 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }} // starting offscreen to the left
            whileInView={{ opacity: 1, x: 0 }} // animate into view
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-purple-900 dark:text-purple-100 mb-6 tracking-tight">
              About BreatheEasy
            </h2>
            <p className="text-xl font-light text-purple-700 dark:text-purple-200 max-w-4xl mx-auto leading-relaxed tracking-wide">
              BreatheEasy is an open-source project that helps you monitor air
              quality in your area, understand pollutant levels, and take
              informed actions for better health. With real-time data from
              cities worldwide, interactive maps, and personalized health
              guidance, we make understanding air quality simple, informative,
              and accessible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }} // starting offscreen to the left
              whileInView={{ opacity: 1, x: 0 }} // animate into view
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Eye className="w-6 h-6 text-emerald-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Real-Time Monitoring
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get live updates on air quality index and pollutant
                    concentrations for any location worldwide.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Health-Focused
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Receive personalized health suggestions and precautions
                    based on current air quality levels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-emerald-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors duration-300">
                    Future Planning
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Access 7-day air quality forecasts to plan outdoor
                    activities and protect your health.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                <h3 className="text-2xl font-display mb-4 animate-fade-in tracking-wide">
                  Why Air Quality Matters
                </h3>
                <ul className="space-y-3 text-lg">
                  {[
                    "Respiratory health protection",
                    "Informed outdoor activity planning",
                    "Community awareness and action",
                    "Long-term health benefits"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 animate-slide-in-right" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 via-violet-50/50 to-blue-50/50 dark:from-indigo-950/50 dark:via-purple-900/50 dark:to-blue-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl lg:text-6xl font-black text-purple-900 dark:text-purple-100 mb-8 tracking-tighter">
              <span className="bg-gradient-to-r from-purple-600 to-emerald-500 bg-clip-text text-transparent">Powerful</span> Features
            </h2>
            <p className="text-xl lg:text-2xl font-light text-purple-700 dark:text-purple-200 max-w-4xl mx-auto leading-relaxed tracking-wide">
              Everything you need to <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-tight">monitor and understand</span> air quality in your
              area and around the world.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-purple-100 dark:border-purple-800/30 overflow-hidden"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Icon container with better styling */}
                <motion.div 
                  className="relative z-10 w-16 h-16 bg-gradient-to-br from-purple-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                </motion.div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-4 group-hover:text-purple-700 dark:group-hover:text-purple-200 transition-colors duration-300 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-300 leading-relaxed font-light tracking-wide">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-8">
              Our <span className="bg-gradient-to-r from-purple-600 to-emerald-500 bg-clip-text text-transparent">Contributors</span>
            </h2>
            <p className="text-xl lg:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed tracking-wide">
              Meet the <span className="font-semibold text-purple-600 dark:text-purple-400">amazing developers</span> who have contributed to making
              BreatheEasy a reality.
            </p>
          </motion.div>

          {/* Maintainer */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-3xl font-bold tracking-wide text-gray-900 dark:text-white mb-10 uppercase">
              Project Maintainer
            </h3>
            <div className="inline-block">
              <a
                href={maintainer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-gradient-to-r from-purple-500 to-emerald-600 rounded-3xl p-10 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">{/* maintainer content continues... */}
                  <img
                    src={maintainer.avatar}
                    alt={maintainer.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                  />
                  <h4 className="text-xl font-bold mb-2 tracking-wide uppercase">{maintainer.name}</h4>
                  <div className="flex justify-center gap-6 text-sm font-medium tracking-wider">
                    <span className="hover:scale-110 transition-transform duration-300">{maintainer.commits} commits</span>
                    <span className="hover:scale-110 transition-transform duration-300">{maintainer.linesAdded} lines added</span>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contributors */}
          <motion.div
            className="transition-all duration-1000 delay-400"
            initial={{ opacity: 0, y: 40 }} // start slightly below
            whileInView={{ opacity: 1, y: 0 }} // animate into view
            transition={{ duration: 1, delay: 0.4 }} // duration and delay match Tailwind classes
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-2xl font-display text-gray-900 dark:text-white mb-8 text-center tracking-wide">
              Contributors
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributors.map((contributor, index) => (
                <a
                  key={index}
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700 text-center group-hover:-translate-y-2">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-emerald-200 dark:border-green-700 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                    />
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors tracking-wide uppercase">
                      {contributor.name}
                    </h4>
                    <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-300 font-medium tracking-wide">
                      <span className="hover:scale-110 transition-transform duration-300">{contributor.commits} commits</span>
                      <span className="hover:scale-110 transition-transform duration-300">{contributor.linesAdded} lines</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            </motion.div>
          </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-purple-100 via-blue-50 to-emerald-50 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-emerald-900/30"
        initial={{ opacity: 0, y: 40 }} // start slightly below
        whileInView={{ opacity: 1, y: 0 }} // animate into view
        transition={{ duration: 1 }} // same as your previous duration-1000
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-8xl font-black text-purple-900 dark:text-purple-100 mb-10 tracking-tighter leading-[0.9]">
            Ready to <span className="bg-gradient-to-r from-purple-600 to-emerald-500 bg-clip-text text-transparent font-black">Monitor</span> 
            <span className="block mt-2 font-extralight italic">Your Air Quality?</span>
          </h2>
          <p className="text-xl lg:text-3xl font-light text-purple-700 dark:text-purple-200 mb-12 leading-relaxed max-w-4xl mx-auto tracking-wide">
            Join <span className="font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">thousands of users</span> who are already making 
            <span className="text-purple-800 dark:text-purple-100 font-semibold tracking-tight"> informed decisions</span> about their health and environment.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-purple-600 to-emerald-500 hover:from-purple-700 hover:to-emerald-600 text-white px-12 py-6 rounded-2xl font-bold text-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
            >
              Launch BreatheEasy
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="https://github.com/prasoonk1204/BreatheEasy"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-600 dark:hover:bg-purple-500 hover:text-white px-12 py-6 rounded-2xl font-semibold text-lg tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 group"
            >
              <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              Contribute
            </a>
          </motion.div>

        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 py-12"
        initial={{ opacity: 0, y: 40 }} // start slightly below
        whileInView={{ opacity: 1, y: 0 }} // animate into view
        transition={{ duration: 1 }} // same as your previous 1000ms
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2 animate-fade-in-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <motion.img
                  src="/favicon.png"
                  alt="Logo"
                  className="w-8 h-8"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.h3
                  className="text-2xl font-bold text-green-500 dark:text-green-400"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  BreatheEasy
                </motion.h3>
              </motion.div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
                An open-source air quality monitoring platform that helps you
                understand and track air quality data for better health
                decisions.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/prasoonk1204/BreatheEasy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="animate-fade-in-up animate-delay-200">
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {[
                  "Live AQI Dashboard",
                  "Global City Search",
                  "Interactive Maps",
                  "Health Suggestions",
                  "7-Day Forecast"
                ].map((item, index) => (
                  <li key={index} className="hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 hover:translate-x-1 cursor-pointer">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in-up animate-delay-400">
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  <a
                    href="https://github.com/prasoonk1204/BreatheEasy"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 flex items-center gap-2 hover:translate-x-1 group"
                  >
                    GitHub Repository
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/prasoonk1204/BreatheEasy/blob/main/README.md"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 flex items-center gap-2 hover:translate-x-1 group"
                  >
                    Documentation
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/prasoonk1204/BreatheEasy/issues"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 flex items-center gap-2 hover:translate-x-1 group"
                  >
                    Report Issues
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 animate-fade-in animate-delay-600">
            <p>
              © {new Date().getFullYear()} BreatheEasy. Open source under{" "}
              <a
                href="https://github.com/prasoonk1204/BreatheEasy/blob/main/License.md"
                className="text-green-500 dark:text-green-400 hover:underline transition-all duration-300 hover:scale-105"
              >
                MIT License
              </a>
              . Built with ❤️ by the open source community.
            </p>
          </div>
        </div>
      </motion.footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-delay-200 {
          animation-delay: 200ms;
        }

        .animate-delay-300 {
          animation-delay: 300ms;
        }

        .animate-delay-400 {
          animation-delay: 400ms;
        }

        .animate-delay-500 {
          animation-delay: 500ms;
        }

        .animate-delay-600 {
          animation-delay: 600ms;
        }

        .animate-delay-700 {
          animation-delay: 700ms;
        }

        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;