import React, { useEffect, useState } from "react";

// Determine suggested actions based on AQI
const getMeasures = (aqi) => {
  if (aqi <= 50) {
    return [
      "Maintain current efforts like using public transport.",
      "Promote green spaces and tree planting.",
      "Encourage friends and family to adopt eco-friendly habits.",
    ];
  } else if (aqi <= 100) {
    return [
      "Use public transportation or carpool more frequently.",
      "Reduce use of fossil fuels at home and work.",
      "Plant trees in your neighborhood.",
      "Support local clean air campaigns.",
    ];
  } else if (aqi <= 150) {
    return [
      "Avoid burning waste; support local clean-up drives.",
      "Switch to energy-efficient appliances.",
      "Minimize vehicle idling and unnecessary travel.",
      "Compost organic waste to reduce landfill emissions.",
    ];
  } else {
    return [
      "Campaign for stricter emission regulations.",
      "Support renewable energy initiatives in your area.",
      "Participate in air quality awareness programs.",
      "Push for better public transport and greener urban planning.",
      "Engage with policymakers to encourage sustainable legislation.",
    ];
  }
};

const ImprovementMeasures = () => {
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("aqiData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAqi(parsed?.aqi);
    }
  }, []);

  const measures = aqi !== null ? getMeasures(aqi) : [];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-emerald-600 mb-6">
        Improvement Measures
      </h2>

      {aqi === null ? (
        <p className="text-gray-500">Loading AQI data...</p>
      ) : (
        <div className="space-y-6">
          <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-lg">
            <p className="text-lg font-medium text-emerald-800 mb-2">
              Actions You Can Take:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {measures.map((item, i) => (
                <li key={i} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">
              🌍 Want to do more?
            </h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Join or organize local environmental drives.</li>
              <li>Educate others about pollution and climate impact.</li>
              <li>Support green startups or eco-conscious brands.</li>
              <li>Reduce plastic usage and support recycling initiatives.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovementMeasures;
