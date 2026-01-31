import React, { useEffect, useState } from "react";

const precautionLinks = {
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
  "Keep quick-relief medicine nearby (e.g., inhalers).": "https://www.aafa.org/asthma-prevention/",
  "Limit children's outdoor playtime and suggest indoor activities.": "https://www.healthychildren.org/",
  "Monitor for heart palpitations or chest pain.": "https://www.heart.org/en/health-topics/consumer-healthcare/air-pollution-and-heart-disease",
  "Pregnant individuals should avoid exposure to fine particles (PM2.5).": "https://www.marchofdimes.org/find-support/topics/pregnancy/air-pollution-during-pregnancy",
  "Outdoor workers should take frequent breaks in filtered indoor areas.": "https://www.osha.gov/publications/bytopic/air-pollution",
  "High-intensity athletes should move training indoors today.": "https://www.runnersworld.com/health-injuries/a20808339/running-and-air-quality/",
  "Minimize physical activity and stay in air-conditioned spaces.": "https://www.nia.nih.gov/health/safety/safe-exercise-older-adults"
};

const getPrecautions = (aqi, profile) => {
  const suggestions = [];
  if (aqi > 50) {
    if (profile.heart) suggestions.push({ text: "Monitor for heart palpitations or chest pain.", isPersonalized: true });
    if (profile.respiratory) suggestions.push({ text: "Keep quick-relief medicine nearby (e.g., inhalers).", isPersonalized: true });
    if (profile.pregnancy) suggestions.push({ text: "Pregnant individuals should avoid exposure to fine particles (PM2.5).", isPersonalized: true });
    if (profile.children) suggestions.push({ text: "Limit children's outdoor playtime and suggest indoor activities.", isPersonalized: true });
    if (profile.elderly && aqi > 80) suggestions.push({ text: "Minimize physical activity and stay in air-conditioned spaces.", isPersonalized: true });
    if (profile.outdoorWorker && aqi > 100) suggestions.push({ text: "Outdoor workers should take frequent breaks in filtered indoor areas.", isPersonalized: true });
    if (profile.athlete && aqi > 100) suggestions.push({ text: "High-intensity athletes should move training indoors today.", isPersonalized: true });
  }

  let baseItems = [];
  if (aqi <= 50) baseItems = ["No specific precautions needed. Enjoy your day!"];
  else if (aqi <= 100) baseItems = ["Sensitive individuals should reduce outdoor exertion.", "Check AQI before outdoor activities."];
  else if (aqi <= 150) baseItems = ["Wear a mask outdoors if you're sensitive to pollution.", "Avoid outdoor exercise in the afternoon.", "Keep windows closed during peak pollution hours."];
  else if (aqi <= 200) baseItems = ["Avoid outdoor activities if possible.", "Use air purifiers indoors.", "Wear certified N95 masks when outside."];
  else baseItems = ["Stay indoors as much as possible.", "Use high-efficiency air purifiers.", "Avoid any strenuous outdoor activity.", "Seek medical advice if breathing issues arise."];

  baseItems.forEach(item => suggestions.push({ text: item, isPersonalized: false }));
  return suggestions;
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
      try {
        const parsed = JSON.parse(storedData);
        setAqiValue(parsed?.aqi || 0);
      } catch (error) {
        setAqiValue(0);
      }
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
    <div className="container mx-auto p-4 sm:p-6 space-y-6 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white rounded-3xl">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-5 sm:p-10 border border-gray-100 dark:border-gray-800">
        <header className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-emerald-600 dark:text-green-400 mb-3 tracking-tight">
            Health Advice Center
          </h2>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 italic font-medium max-w-2xl mx-auto">
            Tailored medical guidance based on your current local air quality.
          </p>
        </header>

        {/* Profile Selection Section */}
        <section className="mb-8 sm:mb-12 p-5 sm:p-8 bg-emerald-50/40 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100/50 dark:border-emerald-800/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                👤 Health Profile
              </h3>
              <p className="text-xs sm:text-sm text-emerald-700/70 dark:text-emerald-400/70 mt-1">
                Select categories for medically-aligned precautions.
              </p>
            </div>
            {isProfileActive && (
               <button 
                onClick={() => setProfile({ respiratory: false, elderly: false, children: false, heart: false, pregnancy: false, outdoorWorker: false, athlete: false })}
                className="text-xs font-bold text-emerald-600 hover:underline underline-offset-4 self-start sm:self-center"
               >
                RESET PROFILE
               </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { id: "respiratory", label: "Asthma / Respiratory" },
              { id: "heart", label: "Heart Conditions" },
              { id: "pregnancy", label: "Pregnant" },
              { id: "elderly", label: "Elderly (65+)" },
              { id: "children", label: "Children (< 12)" },
              { id: "outdoorWorker", label: "Outdoor Worker" },
              { id: "athlete", label: "Active Athlete" },
            ].map((cat) => (
              <label key={cat.id} className={`flex items-center space-x-3 cursor-pointer p-3 sm:p-4 rounded-2xl transition-all border ${profile[cat.id] ? 'bg-white dark:bg-gray-800 border-emerald-500 shadow-md scale-[1.02]' : 'bg-transparent border-transparent hover:bg-emerald-100/30 dark:hover:bg-gray-800/50'}`}>
                <input
                  type="checkbox"
                  name={cat.id}
                  checked={profile[cat.id]}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className={`text-xs sm:text-sm font-semibold ${profile[cat.id] ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Advice List Section */}
        <div className="space-y-8">
          <div className={`border-l-4 sm:border-l-8 p-5 sm:p-8 rounded-r-3xl shadow-xl transition-all ${isProfileActive ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-500' : 'bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-500'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h4 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {isProfileActive ? "Suggestions for You" : "⚠️ General Precautions"}
              </h4>
              {isProfileActive && (
                <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-black animate-pulse tracking-tighter shadow-md">
                  PERSONALIZED ACTIVE
                </div>
              )}
            </div>
            
            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {precautions.map((item, i) => (
                <li key={i} className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white dark:bg-black/20 ${item.isPersonalized ? 'border-2 border-blue-200 dark:border-blue-800/50 shadow-md ring-4 ring-blue-500/5' : 'border border-gray-100 dark:border-gray-800'}`}>
                  <span className="text-xl sm:text-2xl mt-1">{item.isPersonalized ? "⭐" : "•"}</span>
                  <div className="flex-1">
                    <p className={`text-base sm:text-xl leading-snug ${item.isPersonalized ? 'font-bold text-blue-900 dark:text-blue-200' : 'text-gray-700 dark:text-gray-200 font-medium'}`}>
                      {item.text}
                    </p>
                    {precautionLinks[item.text] && (
                      <a
                        href={precautionLinks[item.text]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold hover:gap-2 transition-all"
                      >
                        Read Clinical Guidance <span className="ml-1">→</span>
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Wellness Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 sm:p-8 rounded-3xl border-t-4 sm:border-t-8 border-gray-400 shadow-lg">
              <h5 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3">
                🛡️ Home & Office Safety
              </h5>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 list-disc pl-5 text-sm sm:text-lg">
                <li>Run air purifiers with HEPA filters on high.</li>
                <li>Avoid burning candles or incense indoors.</li>
                <li>Mop floors instead of sweeping to avoid dust.</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/30 p-6 sm:p-8 rounded-3xl border-t-4 sm:border-t-8 border-gray-400 shadow-lg">
              <h5 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3">
                🥦 Nutrition & Wellness
              </h5>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400 list-disc pl-5 text-sm sm:text-lg">
                <li>Increase Vitamin C and E-rich foods.</li>
                <li>Drink plenty of fluids for hydration.</li>
                <li>Monitor for headaches or fatigue signs.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Precautions;