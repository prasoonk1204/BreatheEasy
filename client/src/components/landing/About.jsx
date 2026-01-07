import { motion } from "framer-motion";
import { Eye, Shield, Calendar } from "lucide-react";

const WHY_AIR_QUALITY_MATTERS = [
  "Respiratory health protection",
  "Informed outdoor activity planning",
  "Community awareness and action",
  "Long-term health benefits",
];

const About = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Us
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl">
            <span className="notranslate">BreatheEasy </span> is an open-source
            project that helps you monitor air quality in your area, understand
            pollutant levels, and take informed actions for better health. With
            real-time data from cities worldwide, interactive maps, and
            personalized health guidance, we make understanding air quality
            simple, informative, and accessible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
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
              <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Health-Focused
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive personalized health suggestions and precautions based
                  on current air quality levels.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
              <div className="shrink-0 w-12 h-12 bg-emerald-100 dark:bg-green-800 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-emerald-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  Future Planning
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access 7-day air quality forecasts to plan outdoor activities
                  and protect your health.
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
            <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 animate-fade-in">
                Why Air Quality Matters
              </h3>
              <ul className="space-y-3 text-lg">
                {WHY_AIR_QUALITY_MATTERS.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 animate-slide-in-right"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
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
  );
};

export default About;
