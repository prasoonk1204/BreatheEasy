import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

const FEATURES = [
  {
    name: "Live AQI Dashboard",
    path: "/dashboard",
  },
  {
    name: "Global City Search",
    path: "/dashboard/explore-aqi",
  },
  {
    name: "Interactive Maps",
    path: "/dashboard/explore-aqi",
  },
  {
    name: "Health Suggestions",
    path: "/dashboard/precautions",
  },
  {
    name: "7-Day Forecast",
    path: "/dashboard/chart",
  },
];

const RESOURCES = [
  {
    name: "GitHub Repository",
    href: "https://github.com/prasoonk1204/BreatheEasy",
  },
  {
    name: "Documentation",
    href: "https://github.com/prasoonk1204/BreatheEasy/blob/main/README.md",
  },
  {
    name: "Report Issues",
    href: "https://github.com/prasoonk1204/BreatheEasy/issues",
  },
];

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
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
                className="text-2xl font-bold text-green-500 dark:text-green-400 notranslate"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                BreatheEasy
              </motion.h3>
            </motion.div>

            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              An open-source air quality monitoring platform that helps you
              understand and track air quality data for better health decisions.
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
              {FEATURES.map((item) => (
                <li key={`${item.name}-${item.path}`}>
                  <Link
                    to={item.path}
                    className="block hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-in-up animate-delay-400">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              {RESOURCES.map((item) => (
                <li key={`${item.name}-${item.href}`}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 flex items-center gap-2 hover:translate-x-1 group"
                  >
                    {item.name}
                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400 animate-fade-in animate-delay-600">
          <p>
            © {new Date().getFullYear()} BreatheEasy. Open source under{" "}
            <a
              href="https://github.com/prasoonk1204/BreatheEasy/blob/main/License.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 dark:text-green-400 hover:underline transition-all duration-300 hover:scale-105"
            >
              <span className="notranslate"> MIT License </span>
            </a>
            . Built with ❤️ by the open source community.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
