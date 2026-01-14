import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { contributors } from "@/constants/contirbutors";
import { maintainers } from "@/constants/maintainers";

// Transform contributors data into display format (no fake testimonials, just stats)
const contributorData = contributors.map((contributor) => ({
  text: "",
  image: contributor.avatar,
  name: contributor.name,
  role: "",
  github: contributor.github,
}));

// For mobile: all contributors in one column
const mobileColumn = contributorData;

// For desktop: split into columns (distribute evenly)
const firstColumn = contributorData.filter((_, i) => i % 3 === 0);
const secondColumn = contributorData.filter((_, i) => i % 3 === 1);
const thirdColumn = contributorData.filter((_, i) => i % 3 === 2);

const ContributorTestimonials = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative">
      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-gray-900 dark:text-white">
            Built by the Community
          </h2>
          <p className="text-center mt-5 opacity-75 text-gray-600 dark:text-gray-300">
            Meet the amazing developers who have contributed to making BreatheEasy a reality.
          </p>
        </motion.div>

        {/* Desktop: Side by side | Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-start max-w-7xl mx-auto lg:pl-24">
          {/* Project Maintainers Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-auto lg:flex-shrink-0 flex flex-col items-center"
          >
            <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-6 text-center">
              Project Maintainers
            </h3>
            <div className="flex flex-col gap-6 items-center lg:items-start">
              {maintainers.map((maintainer, index) => (
                <a
                  key={index}
                  href={maintainer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <img
                        src={maintainer.avatar}
                        alt={maintainer.name}
                        className="h-16 w-16 rounded-full"
                      />
                      <div className="flex flex-col">
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
                          {maintainer.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Divider for mobile */}
          <div className="w-full h-px bg-gray-300 dark:bg-gray-700 lg:hidden"></div>

          {/* Community Contributors Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:flex-1 flex flex-col items-center"
          >
            <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mb-6 text-center">
              Community Contributors
            </h3>
            <div className="flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
              {/* Mobile: Single column with all contributors */}
              <TestimonialsColumn 
                testimonials={mobileColumn} 
                duration={30} 
                className="md:hidden" 
              />
              
              {/* Desktop: Three columns split */}
              <TestimonialsColumn 
                testimonials={firstColumn} 
                duration={20} 
                className="hidden md:block" 
              />
              <TestimonialsColumn
                testimonials={secondColumn}
                className="hidden md:block"
                duration={25}
              />
              <TestimonialsColumn
                testimonials={thirdColumn}
                className="hidden xl:block"
                duration={22}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Gradient transition to CTA section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-emerald-50 dark:to-gray-900 pointer-events-none"></div>
    </section>
  );
};

export default ContributorTestimonials;
