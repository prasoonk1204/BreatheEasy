export const getAQILevel = (aqi) => {
  if (aqi <= 50) return { text: "Good", color: "text-green-600 dark:text-green-400" };
  if (aqi <= 100) return { text: "Moderate", color: "text-yellow-600 dark:text-yellow-400" };
  if (aqi <= 150) return { text: "Unhealthy for Sensitive Groups", color: "text-orange-600 dark:text-orange-400" };
  if (aqi <= 200) return { text: "Unhealthy", color: "text-red-600 dark:text-red-400" };
  if (aqi <= 300) return { text: "Very Unhealthy", color: "text-purple-600 dark:text-purple-400" };
  return { text: "Hazardous", color: "text-rose-900 dark:text-rose-400" };
};
