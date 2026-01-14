"use client";

import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 pt-20 sm:pt-0"
      >
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Monitor Air Quality
          <span className="block text-emerald-600 dark:text-green-400 bg-linear-to-r from-emerald-600 via-green-500 to-emerald-600 bg-clip-text">
            Anywhere, Anytime
          </span>
        </h1>
        
        <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl text-center">
          Get real-time air quality data, health suggestions, and detailed
          pollutant analysis for any city around the world. Make informed
          decisions for better health.
        </p>
        
        <Link
          to="/dashboard"
          className="bg-emerald-600 hover:bg-emerald-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 group"
        >
          Start Monitoring
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
