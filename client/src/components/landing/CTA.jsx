import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <motion.section
      className="py-20 bg-linear-to-r from-emerald-600 to-green-600"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in-up">
          Ready to Monitor Your Air Quality?
        </h2>
        <p className="text-xl text-emerald-100 mb-8 animate-fade-in-up animate-delay-200">
          Join thousands of users who are already making informed decisions
          about their health and environment.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/dashboard"
            className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group"
          >
            Launch <span className="notranslate"> BreatheEasy</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <a
            href="https://github.com/prasoonk1204/BreatheEasy"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group"
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Contribute
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTA;
