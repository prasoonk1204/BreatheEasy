import React from 'react';
import { motion } from 'framer-motion';

const DashboardSkeleton = () => {
    const shimmer = {
        initial: { backgroundPosition: "-200px 0" },
        animate: {
            backgroundPosition: "calc(200px + 100%) 0",
        },
        transition: {
            duration: 2,
            ease: "linear",
            repeat: Infinity,
        }
    };

    const SkeletonBox = ({ className = "", children }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden card bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 ${className}`}
            style={{
                backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                backgroundSize: "200px 100%",
                backgroundRepeat: "no-repeat",
            }}
            {...shimmer}
        >
            {children}
        </motion.div>
    );

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {[...Array(4)].map((_, idx) => (
                    <SkeletonBox key={idx} className="p-6 h-32">
                        <div className="space-y-3">
                            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="h-8 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                        </div>
                    </SkeletonBox>
                ))}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* AQI Card Skeleton */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <SkeletonBox className="p-8 h-80">
                        <div className="flex flex-col items-center space-y-6">
                            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                        </div>
                    </SkeletonBox>
                </motion.div>

                {/* Pollutant Details Skeleton */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="lg:col-span-2"
                >
                    <SkeletonBox className="p-8 h-80">
                        <div className="space-y-6">
                            <div className="h-7 w-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 * idx }}
                                        className="space-y-3"
                                    >
                                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                                        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto"></div>
                                        <div className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded-lg mx-auto"></div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </SkeletonBox>
                </motion.div>
            </div>

            {/* Suggestions Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <SkeletonBox className="p-6 h-32">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                            <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="h-4 w-4/5 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="h-4 w-3/5 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                        </div>
                    </div>
                </SkeletonBox>
            </motion.div>

            {/* Additional Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {[...Array(2)].map((_, idx) => (
                    <SkeletonBox key={idx} className="p-6 h-40">
                        <div className="space-y-4">
                            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                            </div>
                        </div>
                    </SkeletonBox>
                ))}
            </motion.div>
        </div>
    );
};

export default DashboardSkeleton;
