import React, { useEffect, useState } from "react";
import AQICard from "../components/AQICard";
import PollutantDetails from "../components/PollutantDetails";
import Suggestions from "../components/Suggestions";
import AQIScaleTable from "../components/AQIScaleTable";
import fetchAQIData from "../utils/fetchAQIData";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAQIData();
        setAqiData(data);
        localStorage.setItem("aqiData", JSON.stringify(data));
      } catch (err) {
        console.error("Failed to load AQI data:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-8">
  <h2 className="text-2xl font-bold text-emerald-500 dark:text-purple-400 mt-4">
    Your Location Air Quality
  </h2>

  {aqiData ? (
    <>
      <p className="text-md text-black dark:text-white font-semibold italic bg-gray-200 dark:bg-gray-700 p-6 rounded-2xl">
        {aqiData.city}
      </p>

      <div className="flex justify-end mb-4">
        <Link 
          to="/health-advisor" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-purple-600 dark:to-purple-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Get Personalized Health Advice
        </Link>
      </div>

      {/* Bento grid layout for AQI and Pollutants */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AQICard aqi={aqiData.aqi} city={aqiData.city} time={aqiData.time} />
        <div className="lg:col-span-2">
          <PollutantDetails components={aqiData.components} />
        </div>
      </div>

      <Suggestions aqi={aqiData.aqi} />
      <AQIScaleTable />
    </>
  ) : (
    <p className="text-black dark:text-white">Loading AQI data...</p>
  )}
</div>

  );
};

export default Dashboard;
