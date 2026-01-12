import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorPage = ({ type = "no-data" }) => {
  const errorConfig = {
    "no-data": {
      icon: AlertCircle,
      iconColor: "text-red-500",
      title: "No Data Available",
      message: "Please visit the Dashboard first to load air quality data",
      buttonText: "Go to Dashboard",
      buttonAction: () => window.location.href = '/dashboard'
    },
    "no-forecast": {
      icon: AlertCircle,
      iconColor: "text-orange-500",
      title: "Unable to Generate Forecast",
      message: "There was an issue generating forecast data",
      buttonText: "Retry",
      buttonAction: () => window.location.reload()
    }
  };

  const config = errorConfig[type];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
        <IconComponent className={`w-20 h-20 ${config.iconColor} mx-auto mb-6`} />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          {config.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {config.message}
        </p>
        <button
          onClick={config.buttonAction}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-all"
        >
          {config.buttonText}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;