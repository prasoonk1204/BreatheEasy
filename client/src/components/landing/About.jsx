import { motion } from "framer-motion";
import { Github, FileText, AlertCircle } from "lucide-react";

const RESOURCES = [
  {
    name: "GitHub Repository",
    href: "https://github.com/prasoonk1204/BreatheEasy",
    icon: Github,
    description: "View source code and contribute",
  },
  {
    name: "Documentation",
    href: "https://github.com/prasoonk1204/BreatheEasy/blob/main/README.md",
    icon: FileText,
    description: "Learn how to use BreatheEasy",
  },
  {
    name: "Report Issues",
    href: "https://github.com/prasoonk1204/BreatheEasy/issues",
    icon: AlertCircle,
    description: "Help us improve the platform",
  },
];

const About = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mobile: Logo at top, Desktop: Content on left */}
          <motion.div
            className="order-1 md:order-1 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About Us
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              <span className="notranslate">BreatheEasy </span> is an open-source
              project that helps you monitor air quality in your area, understand
              pollutant levels, and take informed actions for better health. With
              real-time data from cities worldwide, interactive maps, and
              personalized health guidance, we make understanding air quality
              simple, informative, and accessible.
            </p>

            {/* Resource Links */}
            <div className="mt-8 grid gap-4">
              {RESOURCES.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.a
                    key={resource.name}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-300 group bg-white dark:bg-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                  >
                    <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 dark:group-hover:bg-emerald-600 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {resource.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Mobile: Logo at top, Desktop: Logo on right */}
          <motion.div
            className="order-first md:order-2 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div
              className="relative w-full max-w-md aspect-square flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                // Respect prefers-reduced-motion
                animation: "none",
              }}
            >
              <style>{`
                @media (prefers-reduced-motion: no-preference) {
                  .breathing-logo {
                    animation: breathe 4s ease-in-out infinite;
                  }
                }
                
                @keyframes breathe {
                  0%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.05);
                  }
                }
              `}</style>
              <img
                src="/favicon.png"
                alt="BreatheEasy Logo"
                className="breathing-logo w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
