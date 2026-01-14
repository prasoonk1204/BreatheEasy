import { motion } from "framer-motion";
import { features } from "../../constants/features";

const Features = () => {
  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to monitor and understand air quality
          </p>
        </motion.div>

        {/* Feature Rows */}
        <div className="space-y-12 lg:space-y-12">
          {features.map((feature, index) => {
            const isEven = index % 2 === 0;
            // Convert feature title to image filename
            const imageName = feature.title
              .toLowerCase()
              .replace(/\s+/g, '_')
              .replace(/-/g, '_')
              .replace('personalized', 'personalised') + '.png';

            return (
              <motion.div
                key={index}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Visual Container */}
                <div
                  className={`order-1 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  aria-hidden="true"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    {/* Feature Image */}
                    <img
                      src={`/${imageName}`}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className={`order-2 max-w-xl ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
