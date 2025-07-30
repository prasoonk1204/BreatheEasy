import React, { useEffect, useState } from "react";
import AQICard from "../components/AQICard";
import PollutantDetails from "../components/PollutantDetails";
import Suggestions from "../components/Suggestions";
import AQIScaleTable from "../components/AQIScaleTable";
import fetchAQIData from "../utils/fetchAQIData";

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
