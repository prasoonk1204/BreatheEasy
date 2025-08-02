import React from "react";

const getAQIDescription = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  return "Severe";
};

const getCardColor = (aqi) => {
  if (aqi <= 50)
    return "bg-green-500/90 backdrop-blur-sm text-white hover:bg-green-600/95 dark:bg-green-400/90 dark:hover:bg-green-500/95 border-green-400/50 dark:border-green-300/50";
  if (aqi <= 100)
    return "bg-yellow-400/90 backdrop-blur-sm text-black hover:bg-yellow-500/95 dark:bg-yellow-300/90 dark:text-black dark:hover:bg-yellow-400/95 border-yellow-300/50 dark:border-yellow-200/50";
  if (aqi <= 200)
    return "bg-orange-400/90 backdrop-blur-sm text-white hover:bg-orange-500/95 dark:bg-orange-300/90 dark:text-black dark:hover:bg-orange-400/95 border-orange-300/50 dark:border-orange-200/50";
  if (aqi <= 300)
    return "bg-red-500/90 backdrop-blur-sm text-white hover:bg-red-600/95 dark:bg-red-400/90 dark:text-white dark:hover:bg-red-500/95 border-red-400/50 dark:border-red-300/50";
  if (aqi <= 400)
    return "bg-red-800/90 backdrop-blur-sm text-white hover:bg-red-900/95 dark:bg-red-700/90 dark:hover:bg-red-800/95 border-red-600/50 dark:border-red-500/50";
  return "bg-black/90 backdrop-blur-sm text-white dark:bg-gray-800/90 dark:hover:bg-gray-700/95 border-gray-600/50 dark:border-gray-500/50";
};

const AQICard = ({ aqi, time }) => {
  const cardColor = getCardColor(aqi);
  const formattedTime = time ? new Date(time).toLocaleString() : "N/A";

  return (
    <div
      className={`rounded-2xl p-6 shadow-xl border ${cardColor} flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm`}
    >
      <div>
        <h3 className="text-lg font-semibold mb-2">Current AQI</h3>
        <p className="text-5xl font-bold leading-tight">{aqi}</p>
        <p className="text-xl font-medium mt-2">{getAQIDescription(aqi)}</p>
      </div>

      <p className="text-xs mt-2 opacity-80">
        <span className="font-medium">Last Updated: </span>
        {formattedTime}
      </p>
    </div>
  );
};

export default AQICard;
