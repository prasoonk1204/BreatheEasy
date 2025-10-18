import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-30 md:bottom-40 right-10 md:right-20 z-[9999] p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg text-2xl transition-all duration-300"
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  ) : null;
};

export default ScrollToTop;
