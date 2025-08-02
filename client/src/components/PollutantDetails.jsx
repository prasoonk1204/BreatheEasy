import React from "react";
import { Cloud, CloudDrizzle, Wind, Sun, AlertTriangle } from "lucide-react";

// Map pollutant keys to full names and icons
const pollutantLabels = {
  pm25: {
    label: "PM2.5 (Fine Particles)",
    icon: <CloudDrizzle className="w-5 h-5 text-pink-600" />,
  },
  pm10: {
    label: "PM10 (Coarse Particles)",
    icon: <Cloud className="w-5 h-5 text-yellow-600" />,
  },
  o3: {
    label: "Ozone (O₃)",
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
  },
  no2: {
    label: "Nitrogen Dioxide (NO₂)",
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
  },
  so2: {
    label: "Sulfur Dioxide (SO₂)",
    icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  },
  co: {
    label: "Carbon Monoxide (CO)",
    icon: <Wind className="w-5 h-5 text-blue-500" />,
  },
};

const PollutantDetails = ({ components }) => (
  <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-xl p-6 rounded-2xl shadow-md">
    <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
      Pollutant Details
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {Object.entries(components).map(([key, value]) => {
        const { label, icon } = pollutantLabels[key] || {
          label: key.toUpperCase(),
          icon: null,
        };

        return (
          <div
            key={key}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700 card-hover"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-full bg-muted dark:bg-gray-700">
                {icon}
              </div>
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                {label}
              </h4>
            </div>
            <div className="mt-1 text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-green-700/50 text-sm font-semibold text-emerald-800 dark:text-white">
                {value} μg/m³
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default PollutantDetails;
