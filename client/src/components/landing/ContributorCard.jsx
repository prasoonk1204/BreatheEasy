import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { contributors } from "../../constants/contirbutors";

const ContributorCard = () => {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.scrollWidth / 2);
    }
  }, []);

  return (
    <motion.div
      ref={sliderRef}
      className="flex gap-6"
      animate={{ x: [0, -sliderWidth] }}
      transition={{
        duration: 25,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {[...contributors, ...contributors].map((contributor, index) => (
        <a
          key={index}
          href={contributor.github}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-62.5"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center border border-gray-200 dark:border-gray-700">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {contributor.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {contributor.commits} commits • {contributor.linesAdded} lines
            </p>
          </div>
        </a>
      ))}
    </motion.div>
  );
}

export default ContributorCard
