import React from "react";
import { AlertCircle, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";

const ErrorPage = ({ type = "no-data", message = null }) => {
  const errorConfig = {
    "no-data": {
      icon: AlertCircle,
      iconColor: "text-red-500",
      bgColor: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      borderColor: "border-red-200 dark:border-red-800",
      title: "No Data Available",
      message: message || "Please visit the Dashboard first to load air quality data for your location.",
      buttonText: "Go to Dashboard",
      buttonColor: "bg-red-500 hover:bg-red-600",
      buttonAction: () => window.location.href = '/dashboard',
      icon2: ArrowRight
    },
    "no-forecast": {
      icon: TrendingUp,
      iconColor: "text-orange-500",
      bgColor: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      borderColor: "border-orange-200 dark:border-orange-800",
      title: "Limited Forecast Data",
      message: message || "The WAQI API provides limited forecast data for this location. Historical trends and current readings are available, but multi-day forecasts may not be complete.",
      buttonText: "Refresh Data",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      buttonAction: () => window.location.reload(),
      icon2: RefreshCw
    }
  };

  const config = errorConfig[type] || errorConfig["no-data"];
  const IconComponent = config.icon;
  const Icon2Component = config.icon2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Error Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          {/* Icon with Animated Background */}
          <div className="relative inline-block mb-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${config.bgColor} rounded-full blur-2xl opacity-50 animate-pulse`}></div>
            <div className={`relative bg-gradient-to-br ${config.bgColor} p-6 rounded-full border-4 ${config.borderColor}`}>
              <IconComponent className={`w-16 h-16 ${config.iconColor}`} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {config.title}
          </h2>

          {/* Message */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {config.message}
          </p>

          {/* Action Button */}
          <button
            onClick={config.buttonAction}
            className={`${config.buttonColor} text-white font-semibold px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto group`}
          >
            <span>{config.buttonText}</span>
            <Icon2Component className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Helpful Tips Card */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">💡</span>
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                {type === "no-data" ? "Getting Started" : "About Forecast Data"}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {type === "no-data" 
                  ? "Visit the Dashboard to fetch real-time air quality data from the WAQI API. The data includes current AQI readings, pollutant levels, and historical trends for your location."
                  : "WAQI provides forecast data for PM2.5, PM10, and Ozone (O₃) when available. Some monitoring stations may have limited forecast capabilities. Try refreshing or selecting a different location with more complete data."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;