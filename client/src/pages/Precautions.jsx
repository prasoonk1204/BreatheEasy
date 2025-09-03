import React, { useEffect, useState } from "react";



const precautionLinks = {
  "No specific precautions needed. Enjoy your day!":
    "https://www.airnow.gov/aqi/aqi-basics/",
  "Sensitive individuals should reduce outdoor exertion.":
    "https://www.epa.gov/air-quality-index/aqi-basics#health",
  "Check AQI before outdoor activities.":
    "https://www.airnow.gov/aqi/aqi-basics/",
  "Wear a mask outdoors if you're sensitive to pollution.":
    "https://www.cdc.gov/air/pollutants.htm",
  "Avoid outdoor exercise in the afternoon.":
    "https://www.lung.org/clean-air/outdoors/what-makes-air-unhealthy",
  "Keep windows closed during peak pollution hours.":
    "https://www.healthline.com/health/indoor-air-quality",
  "Avoid outdoor activities if possible.":
    "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health",
  "Use air purifiers indoors.":
    "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-home",
  "Wear certified N95 masks when outside.":
    "https://www.cdc.gov/niosh/npptl/topics/respirators/disp_part/n95list1.html",
  "Stay indoors as much as possible.":
    "https://www.lung.org/lung-health-diseases/lung-disease-lookup/air-pollution/staying-indoors",
  "Use high-efficiency air purifiers.":
    "https://www.consumerreports.org/air-purifiers/best-air-purifiers-of-the-year-a1200156329/",
  "Avoid any strenuous outdoor activity.":
    "https://www.airnow.gov/aqi/aqi-basics/",
  "Seek medical advice if breathing issues arise.":
    "https://www.cdc.gov/air/pollutants.htm",
};

const getPrecautions = (aqi) => {
  if (aqi <= 50) {
    return ["No specific precautions needed. Enjoy your day!"];
  } else if (aqi <= 100) {
    return [
      "Sensitive individuals should reduce outdoor exertion.",
      "Check AQI before outdoor activities.",
    ];
  } else if (aqi <= 150) {
    return [
      "Wear a mask outdoors if you're sensitive to pollution.",
      "Avoid outdoor exercise in the afternoon.",
      "Keep windows closed during peak pollution hours.",
    ];
  } else if (aqi <= 200) {
    return [
      "Avoid outdoor activities if possible.",
      "Use air purifiers indoors.",
      "Wear certified N95 masks when outside.",
    ];
  } else {
    return [
      "Stay indoors as much as possible.",
      "Use high-efficiency air purifiers.",
      "Avoid any strenuous outdoor activity.",
      "Seek medical advice if breathing issues arise.",
    ];
  }
};

const Precautions = () => {
  const [precautions, setPrecautions] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("aqiData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      const aqi = parsed?.aqi;
      setPrecautions(getPrecautions(aqi));
    }
  }, []);

  return (
    <div className="my-20 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-emerald-600 dark:text-green-400 mb-6">
        Health Precautions
      </h2>

      {precautions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Loading AQI-related precautions...
        </p>
      ) : (
        <div className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 rounded-lg">
            <p className="text-lg font-medium text-yellow-800 dark:text-yellow-300 mb-2">
              Based on Current Air Quality:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-2">
              {precautions.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item}
                  {precautionLinks[item] && (
                    <>
                      {" "}
                      <a
                        href={precautionLinks[item]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 underline ml-2 text-sm"
                      >
                        Read more
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 border-l-4 border-gray-400 dark:border-gray-500 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 dark:text-gray-100 mb-2">
              🛡️ General Protective Measures:
            </h3>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200 space-y-1">
              <li>Stay hydrated and eat antioxidant-rich foods.</li>
              <li>
                Use indoor plants that help purify air (like snake plant, spider
                plant).
              </li>
              <li>
                Ensure proper ventilation with filters at home or workplace.
              </li>
              <li>
                Stay informed using reliable AQI monitoring apps or websites.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Precautions;
