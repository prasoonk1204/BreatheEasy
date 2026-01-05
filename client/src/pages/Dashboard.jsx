import React, { useEffect, useState } from "react";
import AQICard from "../components/AQICard";
import PollutantDetails from "../components/PollutantDetails";
import Suggestions from "../components/Suggestions";
import AQIScaleTable from "../components/AQIScaleTable";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";
import { fetchAqiForCurrentLocation } from "../services/apiService";

const Dashboard = () => {
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAqiForCurrentLocation();
        setAqiData(data);
        localStorage.setItem("aqiData", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to load AQI data:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Themed Background with Environmental Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-3xl">
        {/* Abstract Nature Patterns */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          {/* Flowing Air Currents Pattern */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="airCurrents" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0,10 Q5,5 10,10 T20,10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
                  <path d="M0,15 Q5,10 10,15 T20,15" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#airCurrents)" className="text-emerald-600 dark:text-emerald-400"/>
            </svg>
          </div>
          
          {/* Leaf Motifs with Floating Animation */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-20 dark:opacity-30 float-animation">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50,10 Q80,20 70,50 Q60,80 50,90 Q40,80 30,50 Q20,20 50,10" 
                    fill="currentColor" className="text-green-600 dark:text-green-400"/>
            </svg>
          </div>
          
          <div className="absolute bottom-20 left-10 w-24 h-24 opacity-15 dark:opacity-25 float-animation" style={{animationDelay: '2s'}}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50,10 Q75,25 65,50 Q55,75 50,90 Q45,75 35,50 Q25,25 50,10" 
                    fill="currentColor" className="text-teal-600 dark:text-teal-400"/>
            </svg>
          </div>
        </div>
        
        {/* Subtle Grid Pattern for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.1)_1px,transparent_0)] bg-[length:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(34,197,94,0.05)_1px,transparent_0)]"></div>
      </div>

      {/* Content Container with Enhanced Styling */}
      <div className="relative z-10 space-y-8 p-6">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold gradient-text">
            Your Location Air Quality
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full breathe-animation"></div>
        </div>

        {aqiData ? (
          <>
            {/* Enhanced City Display */}
            <div className="text-center">
              <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold italic bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg card-hover">
                📍 {aqiData.city}
              </p>
            </div>

            {/* Enhanced Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="transform transition-transform duration-300 breathe-animation">
                <AQICard aqi={aqiData.aqi} time={aqiData.time} />
              </div>
              <div className="lg:col-span-2 transform transition-transform duration-300">
                <PollutantDetails components={aqiData.components} />
              </div>
            </div>

            {/* Enhanced Suggestions and Scale Table */}
            <div className="space-y-6">
              <div className="transform transition-transform duration-300">
                <Suggestions aqi={aqiData.aqi} />
              </div>
              <div className="transform transition-transform duration-300">
                <AQIScaleTable />
              </div>
            </div>
          </>
        ) : (
          <div className="flex gap-6 flex-col min-h-[400px]">
            <DashboardSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
