import React from "react";
import { Smile, AlertCircle, Activity, Frown, ShieldOff } from "lucide-react";

const getSuggestionDetails = (aqi) => {
  if (aqi <= 50) {
    return {
      icon: <Smile className="text-green-500 w-5 h-5" />,
      title: "Good Air Quality",
      advice: "Enjoy your day! Ideal conditions for outdoor activities.",
      bg: "bg-green-100 dark:bg-green-900/30",
    };
  } else if (aqi <= 100) {
    return {
      icon: <AlertCircle className="text-yellow-500 w-5 h-5" />,
      title: "Fair Air Quality",
      advice: "Sensitive groups should limit extended outdoor exposure.",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
    };
  } else if (aqi <= 150) {
    return {
      icon: <Activity className="text-orange-500 w-5 h-5" />,
      title: "Moderate Pollution",
      advice:
        "Limit prolonged outdoor exertion. Children and elderly should be cautious.",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    };
  } else if (aqi <= 200) {
    return {
      icon: <Frown className="text-red-500 w-5 h-5" />,
      title: "Poor Air Quality",
      advice: "Avoid outdoor activities. Wear a mask if going out.",
      bg: "bg-red-100 dark:bg-red-900/30",
    };
  } else {
    return {
      icon: <ShieldOff className="text-red-800 w-5 h-5 dark:text-red-300" />,
      title: "Very Poor Air Quality",
      advice: "Stay indoors with air purifiers. Keep windows shut.",
      bg: "bg-red-800/20 dark:bg-red-900/40",
    };
  }
};

const Suggestions = ({ aqi }) => {
  const { icon, title, advice, bg } = getSuggestionDetails(aqi);

  return (
    <div className={`${bg} p-4 rounded-xl shadow-md card-hover`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{advice}</p>
    </div>
  );
};

export default Suggestions;
