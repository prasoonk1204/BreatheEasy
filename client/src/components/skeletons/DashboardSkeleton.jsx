import React from 'react';

const DashboardSkeleton = () => {
    return (
        <>
            {/* AQI Header Placeholder */}
            <div className="rounded-2xl p-6 bg-gray-200 dark:bg-gray-900 flex flex-col justify-between animate-pulse transition-all duration-300">
                <div className="mt-2 w-2/3 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            {/* AQI + Pollutants Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
                {/* AQI Card Skeleton */}
                <div className="rounded-2xl p-6 shadow-md bg-gray-200 dark:bg-gray-900 flex flex-col justify-between">
                    <div>
                        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
                        <div className="h-20 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
                        <div className="h-5 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
                    </div>
                    <div className="mt-4 h-3 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>

                {/* Pollutant Details Skeleton */}
                <div className="lg:col-span-2 bg-gray-200 dark:bg-gray-900 backdrop-blur-xl p-6 rounded-2xl shadow-md">
                    <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-5" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-200 dark:bg-gray-900 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
                                    <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
                                </div>
                                <div className="mt-1 h-6 w-20 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Suggestions Skeleton */}
            <div className="p-4 rounded-xl shadow-md bg-gray-200 dark:bg-gray-900 animate-pulse">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>

            {/* AQI Scale Table Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-900/60 backdrop-blur-lg p-6 rounded-xl shadow-md w-full animate-pulse">
                <div className="h-7 w-72 bg-gray-300 dark:bg-gray-700 rounded mb-6" />
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-base border-collapse overflow-hidden">
                        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                            <tr>
                                <th className="py-3 px-4">Level</th>
                                <th className="py-3 px-4">Range</th>
                                <th className="py-3 px-4">Health Implications</th>
                                <th className="py-3 px-4">Sensitive Groups</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(6)].map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out"
                                >
                                    <td className="py-4 px-4">
                                        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
                                        <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded" />
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default DashboardSkeleton;
