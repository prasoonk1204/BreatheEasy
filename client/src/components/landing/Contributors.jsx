import { motion } from "framer-motion";
import MaintainerCard from "./MaintainerCard";
import ContributorCard from "./ContributorCard";

const Contributors = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Contributors
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the amazing developers who have contributed to making
            <span className="notranslate"> BreatheEasy </span> a reality.
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
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Project Maintainer
          </h3>
          <MaintainerCard /> {/* Maintainer component */}
        </motion.div>

        {/* Contributors */}
        <motion.div
          className="transition-all duration-1000 delay-400"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Contributors
          </h3>
          {/* Slider */}
          <motion.div className="overflow-hidden">
            <ContributorCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contributors;
