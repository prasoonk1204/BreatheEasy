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
    return "bg-green-500 text-white hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500";
  if (aqi <= 100)
    return "bg-yellow-400 text-black hover:bg-yellow-500 dark:bg-yellow-300 dark:text-black";
  if (aqi <= 200)
    return "bg-orange-400 text-white hover:bg-orange-500 dark:bg-orange-300 dark:text-black";
  if (aqi <= 300)
    return "bg-red-500 text-white hover:bg-red-600 dark:bg-red-400 dark:text-white";
  if (aqi <= 400)
    return "bg-red-800 text-white hover:bg-red-900 dark:bg-red-700";
  return "bg-black text-white dark:bg-gray-800";
};

const AQICard = ({ aqi, city, time }) => {
  const cardColor = getCardColor(aqi);
  const formattedTime = time ? new Date(time).toLocaleString() : "N/A";

  return (
    <div
      className={`rounded-2xl p-6 shadow-md ${cardColor} flex flex-col justify-between transition-all duration-300 hover:shadow-lg`}
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
