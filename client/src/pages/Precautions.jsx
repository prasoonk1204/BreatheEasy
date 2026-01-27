import React, { useEffect, useState } from "react";

const precautionLinks = {
  // General Precautions
  "No specific precautions needed. Enjoy your day!": "https://www.airnow.gov/aqi/aqi-basics/",
  "Sensitive individuals should reduce outdoor exertion.": "https://www.epa.gov/air-quality-index/aqi-basics#health",
  "Check AQI before outdoor activities.": "https://www.airnow.gov/aqi/aqi-basics/",
  "Wear a mask outdoors if you're sensitive to pollution.": "https://www.cdc.gov/air/pollutants.htm",
  "Avoid outdoor exercise in the afternoon.": "https://www.lung.org/clean-air/outdoors/what-makes-air-unhealthy",
  "Keep windows closed during peak pollution hours.": "https://www.healthline.com/health/indoor-air-quality",
  "Avoid outdoor activities if possible.": "https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health",
  "Use air purifiers indoors.": "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-and-air-filters-home",
  "Wear certified N95 masks when outside.": "https://www.cdc.gov/niosh/npptl/topics/respirators/disp_part/n95list1.html",
  "Stay indoors as much as possible.": "https://www.lung.org/lung-health-diseases/lung-disease-lookup/air-pollution/staying-indoors",
  "Use high-efficiency air purifiers.": "https://www.consumerreports.org/air-purifiers/best-air-purifiers-of-the-year-a1200156329/",
  "Avoid any strenuous outdoor activity.": "https://www.airnow.gov/aqi/aqi-basics/",
  "Seek medical advice if breathing issues arise.": "https://www.cdc.gov/air/pollutants.htm",

  // Enhanced Personalized Advice
  "Keep quick-relief medicine nearby (e.g., inhalers).": "https://www.aafa.org/asthma-prevention/",
  "Limit children's outdoor playtime and suggest indoor activities.": "https://www.healthychildren.org/",
  "Monitor for heart palpitations or chest pain.": "https://www.heart.org/en/health-topics/consumer-healthcare/air-pollution-and-heart-disease",
  "Pregnant individuals should avoid exposure to fine particles (PM2.5).": "https://www.marchofdimes.org/find-support/topics/pregnancy/air-pollution-during-pregnancy",
  "Outdoor workers should take frequent breaks in filtered indoor areas.": "https://www.osha.gov/publications/bytopic/air-pollution",
  "High-intensity athletes should move training indoors today.": "https://www.runnersworld.com/health-injuries/a20808339/running-and-air-quality/",
  "Minimize physical activity and stay in air-conditioned spaces.": "https://www.nia.nih.gov/health/safety/safe-exercise-older-adults"
};

const getPrecautions = (aqi, profile) => {
  let base = [];
  // Base logic for AQI levels
  if (aqi <= 50) {
    base = ["No specific precautions needed. Enjoy your day!"];
  } else if (aqi <= 100) {
    base = ["Sensitive individuals should reduce outdoor exertion.", "Check AQI before outdoor activities."];
  } else if (aqi <= 150) {
    base = ["Wear a mask outdoors if you're sensitive to pollution.", "Avoid outdoor exercise in the afternoon.", "Keep windows closed during peak pollution hours."];
  } else if (aqi <= 200) {
    base = ["Avoid outdoor activities if possible.", "Use air purifiers indoors.", "Wear certified N95 masks when outside."];
  } else {
    base = ["Stay indoors as much as possible.", "Use high-efficiency air purifiers.", "Avoid any strenuous outdoor activity.", "Seek medical advice if breathing issues arise."];
  }

  // Priority Personalized Suggestions
  if (aqi > 50) {
    if (profile.heart) base.unshift("Monitor for heart palpitations or chest pain.");
    if (profile.respiratory) base.unshift("Keep quick-relief medicine nearby (e.g., inhalers).");
    if (profile.pregnancy) base.unshift("Pregnant individuals should avoid exposure to fine particles (PM2.5).");
    if (profile.children) base.unshift("Limit children's outdoor playtime and suggest indoor activities.");
    if (profile.elderly && aqi > 80) base.unshift("Minimize physical activity and stay in air-conditioned spaces.");
    if (profile.outdoorWorker && aqi > 100) base.unshift("Outdoor workers should take frequent breaks in filtered indoor areas.");
    if (profile.athlete && aqi > 100) base.unshift("High-intensity athletes should move training indoors today.");
  }

  return base;
};

const Precautions = () => {
  const [precautions, setPrecautions] = useState([]);
  const [aqiValue, setAqiValue] = useState(0);
  const [profile, setProfile] = useState({
    respiratory: false,
    elderly: false,
    children: false,
    heart: false,
    pregnancy: false,
    outdoorWorker: false,
    athlete: false,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("aqiData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAqiValue(parsed?.aqi || 0);
    }
  }, []);

  useEffect(() => {
    setPrecautions(getPrecautions(aqiValue, profile));
  }, [aqiValue, profile]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProfile((prev) => ({ ...prev, [name]: checked }));
  };

  const isProfileActive = Object.values(profile).some(val => val);

  return (
    <div className="my-20 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-100 dark:border-gray-800">
      <header className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-emerald-600 dark:text-green-400 mb-2">
          Health Advice Center
        </h2>
        <p className="text-gray-500 dark:text-gray-400 italic">
          Localized data for real-world impact.
        </p>
      </header>

      {/* Expanded Profile Selection */}
      <section className="mb-10 p-6 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800">
        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-4 flex items-center">
          👤 Personalized Health Profile
        </h3>
        <p className="text-sm text-emerald-700/70 dark:text-emerald-400/70 mb-6">
          Check any categories that apply to receive medically-aligned precautions based on your current local AQI.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: "respiratory", label: "Asthma / Respiratory Issues" },
            { id: "heart", label: "Heart Conditions" },
            { id: "pregnancy", label: "Pregnant" },
            { id: "elderly", label: "Elderly (65+)" },
            { id: "children", label: "Children (under 12)" },
            { id: "outdoorWorker", label: "Outdoor Worker" },
            { id: "athlete", label: "Active Athlete" },
          ].map((cat) => (
            <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group hover:bg-white dark:hover:bg-gray-800 p-2 rounded-lg transition-all shadow-sm">
              <input
                type="checkbox"
                name={cat.id}
                checked={profile[cat.id]}
                onChange={handleCheckboxChange}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </section>

      {/* Main Advice Display */}
      {precautions.length === 0 ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Calculating your safety levels...</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className={`border-l-8 p-6 rounded-r-xl shadow-lg transition-all transform hover:scale-[1.01] ${isProfileActive ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'}`}>
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                {isProfileActive ? "Suggestions for You" : "⚠️ General Precautions"}
              </h4>
              {isProfileActive && (
                <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-full animate-pulse shadow-md">
                  <span className="text-xs font-black">PERSONALIZED ACTIVE</span>
                </div>
              )}
            </div>
            
            <ul className="grid grid-cols-1 gap-4">
              {precautions.map((item, i) => {
                const isPersonalized = i < (Object.values(profile).filter(v => v).length) && isProfileActive;
                return (
                  <li key={i} className={`flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-black/20 ${isPersonalized ? 'border border-blue-200 dark:border-blue-800 shadow-sm' : ''}`}>
                    <span className="text-xl">{isPersonalized ? "⭐" : "•"}</span>
                    <div className="flex-1">
                      <p className={`text-lg leading-tight ${isPersonalized ? 'font-bold text-blue-800 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}>
                        {item}
                      </p>
                      {precautionLinks[item] && (
                        <a
                          href={precautionLinks[item]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:underline"
                        >
                          Clinical Guidance →
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Supportive Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border-t-4 border-gray-400">
              <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                🛡️ Home & Office Safety
              </h5>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                <li>Run air purifiers with HEPA filters on high during peaks.</li>
                <li>Avoid burning candles or incense indoors.</li>
                <li>Mop floors instead of sweeping to avoid kicking up dust.</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-2xl border-t-4 border-gray-400">
              <h5 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                🥦 Nutrition & Wellness
              </h5>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                <li>Increase intake of Vitamin C and E-rich foods.</li>
                <li>Drink plenty of fluids to keep mucous membranes hydrated.</li>
                <li>Monitor for headaches or fatigue—early signs of poor AQI.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Precautions;