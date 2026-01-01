import React, { useEffect, useState } from "react";
import {
  Car,
  Bus,
  Bike,
  Home,
  Lightbulb,
  Trees,
  Leaf,
  Users,
  Megaphone,
  Scale,
  Factory,
  Wind,
  Share2,
  CheckCircle2,
  Circle,
  TrendingUp,
  Award,
  Target,
  Sparkles,
} from "lucide-react";

// Action categories with icons and impact levels
const actionCategories = {
  personal: {
    name: "Personal Actions",
    icon: <Target className="w-5 h-5" />,
    color: "emerald",
  },
  community: {
    name: "Community Actions",
    icon: <Users className="w-5 h-5" />,
    color: "blue",
  },
  policy: {
    name: "Policy & Advocacy",
    icon: <Megaphone className="w-5 h-5" />,
    color: "purple",
  },
};

// Comprehensive action items with categories and impact
const getAllActions = (aqi, dominantPollutant) => {
  const actions = {
    personal: [],
    community: [],
    policy: [],
  };

  // Personal Actions based on AQI
  if (aqi <= 50) {
    actions.personal = [
      { id: "p1", text: "Continue using public transport or carpooling", icon: <Bus />, impact: "High", co2: "500kg/year" },
      { id: "p2", text: "Maintain energy-efficient appliances at home", icon: <Lightbulb />, impact: "Medium", co2: "200kg/year" },
      { id: "p3", text: "Keep indoor plants to naturally purify air", icon: <Leaf />, impact: "Low", co2: "50kg/year" },
      { id: "p4", text: "Walk or bike for short distances", icon: <Bike />, impact: "High", co2: "300kg/year" },
    ];
  } else if (aqi <= 100) {
    actions.personal = [
      { id: "p5", text: "Switch to public transport or carpool daily", icon: <Bus />, impact: "High", co2: "500kg/year" },
      { id: "p6", text: "Reduce vehicle idling and unnecessary trips", icon: <Car />, impact: "High", co2: "400kg/year" },
      { id: "p7", text: "Use LED bulbs and energy-efficient devices", icon: <Lightbulb />, impact: "Medium", co2: "250kg/year" },
      { id: "p8", text: "Avoid using wood-burning stoves or fireplaces", icon: <Home />, impact: "Medium", co2: "300kg/year" },
      { id: "p9", text: "Keep windows closed during high pollution hours", icon: <Home />, impact: "Low", co2: "N/A" },
    ];
  } else if (aqi <= 150) {
    actions.personal = [
      { id: "p10", text: "Avoid burning waste or leaves in your yard", icon: <Leaf />, impact: "High", co2: "600kg/year" },
      { id: "p11", text: "Use air purifiers with HEPA filters at home", icon: <Wind />, impact: "Medium", co2: "N/A" },
      { id: "p12", text: "Minimize outdoor exercise during peak hours", icon: <Home />, impact: "Low", co2: "N/A" },
      { id: "p13", text: "Share rides or use electric vehicles", icon: <Car />, impact: "High", co2: "800kg/year" },
      { id: "p14", text: "Switch to renewable energy sources if possible", icon: <Lightbulb />, impact: "High", co2: "1000kg/year" },
    ];
  } else {
    actions.personal = [
      { id: "p15", text: "Stay indoors and use air purifiers", icon: <Home />, impact: "High", co2: "N/A" },
      { id: "p16", text: "Wear N95/N99 masks when going outside", icon: <Wind />, impact: "High", co2: "N/A" },
      { id: "p17", text: "Avoid all outdoor physical activities", icon: <Home />, impact: "High", co2: "N/A" },
      { id: "p18", text: "Use electric or hybrid vehicles only", icon: <Car />, impact: "High", co2: "1200kg/year" },
      { id: "p19", text: "Install indoor air quality monitors", icon: <Wind />, impact: "Medium", co2: "N/A" },
    ];
  }

  // Community Actions
  if (aqi <= 100) {
    actions.community = [
      { id: "c1", text: "Organize tree planting drives in your area", icon: <Trees />, impact: "High", co2: "5000kg/year" },
      { id: "c2", text: "Start carpooling groups in your neighborhood", icon: <Users />, impact: "High", co2: "2000kg/year" },
      { id: "c3", text: "Support local clean energy initiatives", icon: <Lightbulb />, impact: "Medium", co2: "1000kg/year" },
      { id: "c4", text: "Educate others about air quality awareness", icon: <Megaphone />, impact: "Medium", co2: "N/A" },
    ];
  } else {
    actions.community = [
      { id: "c5", text: "Organize community clean-up drives", icon: <Users />, impact: "High", co2: "3000kg/year" },
      { id: "c6", text: "Create green spaces and urban forests", icon: <Trees />, impact: "High", co2: "8000kg/year" },
      { id: "c7", text: "Start anti-waste burning campaigns", icon: <Leaf />, impact: "High", co2: "4000kg/year" },
      { id: "c8", text: "Promote public transport usage in community", icon: <Bus />, impact: "High", co2: "5000kg/year" },
      { id: "c9", text: "Support local sustainable businesses", icon: <Users />, impact: "Medium", co2: "2000kg/year" },
    ];
  }

  // Policy Actions
  if (aqi <= 100) {
    actions.policy = [
      { id: "po1", text: "Support stricter vehicle emission standards", icon: <Scale />, impact: "High", co2: "10000kg/year" },
      { id: "po2", text: "Advocate for more green public spaces", icon: <Trees />, impact: "Medium", co2: "5000kg/year" },
      { id: "po3", text: "Push for renewable energy subsidies", icon: <Lightbulb />, impact: "High", co2: "8000kg/year" },
    ];
  } else {
    actions.policy = [
      { id: "po4", text: "Demand industrial emission regulations", icon: <Factory />, impact: "High", co2: "20000kg/year" },
      { id: "po5", text: "Campaign for cleaner public transport", icon: <Bus />, impact: "High", co2: "15000kg/year" },
      { id: "po6", text: "Advocate for construction dust control", icon: <Wind />, impact: "High", co2: "5000kg/year" },
      { id: "po7", text: "Support clean air legislation initiatives", icon: <Scale />, impact: "High", co2: "10000kg/year" },
      { id: "po8", text: "Push for urban green infrastructure", icon: <Trees />, impact: "High", co2: "12000kg/year" },
    ];
  }

  // Add pollutant-specific recommendations
  if (dominantPollutant === "pm25" || dominantPollutant === "pm10") {
    actions.personal.unshift({
      id: "pp1",
      text: "Use air purifiers to filter particulate matter",
      icon: <Wind />,
      impact: "High",
      co2: "N/A",
      pollutantSpecific: true,
    });
  } else if (dominantPollutant === "no2" || dominantPollutant === "co") {
    actions.personal.unshift({
      id: "pp2",
      text: "Reduce vehicle usage - main source of NO₂ and CO",
      icon: <Car />,
      impact: "High",
      co2: "600kg/year",
      pollutantSpecific: true,
    });
  } else if (dominantPollutant === "o3") {
    actions.personal.unshift({
      id: "pp3",
      text: "Avoid outdoor activities during peak sunlight hours",
      icon: <Home />,
      impact: "Medium",
      co2: "N/A",
      pollutantSpecific: true,
    });
  }

  return actions;
};

const ImprovementMeasures = () => {
  const [aqiData, setAqiData] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [completedActions, setCompletedActions] = useState({});
  const [showShareMessage, setShowShareMessage] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("aqiData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setAqiData(parsed);
      } catch (e) {
        console.error("Failed to parse AQI data", e);
      }
    }

    // Load completed actions from localStorage
    const storedCompleted = localStorage.getItem("completedActions");
    if (storedCompleted) {
      try {
        setCompletedActions(JSON.parse(storedCompleted));
      } catch (e) {
        console.error("Failed to parse completed actions", e);
      }
    }
  }, []);

  const toggleAction = (actionId) => {
    const newCompleted = {
      ...completedActions,
      [actionId]: !completedActions[actionId],
    };
    setCompletedActions(newCompleted);
    localStorage.setItem("completedActions", JSON.stringify(newCompleted));
  };

  const handleShare = () => {
    const completedCount = Object.values(completedActions).filter(Boolean).length;
    const text = `🌱 I'm taking action for cleaner air!\n\n✅ Completed ${completedCount} eco-friendly actions on BreatheEasy\n🌍 Join me in improving air quality!\n\nCheck your city's air quality and take action!`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setShowShareMessage(true);
        setTimeout(() => setShowShareMessage(false), 3000);
      });
    }
  };

  if (!aqiData || aqiData.aqi === undefined) {
    return (
      <div className="my-20 bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 dark:border-emerald-400"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading AQI data...</p>
        </div>
      </div>
    );
  }

  const actions = getAllActions(aqiData.aqi, aqiData.dominentpol);
  const allActions = [...actions.personal, ...actions.community, ...actions.policy];
  
  const filteredActions =
    activeCategory === "all"
      ? allActions
      : actions[activeCategory] || [];

  const totalActions = allActions.length;
  const completedCount = Object.values(completedActions).filter(Boolean).length;
  const progressPercentage = totalActions > 0 ? (completedCount / totalActions) * 100 : 0;

  // Calculate total CO2 saved
  const totalCO2Saved = allActions
    .filter((action) => completedActions[action.id])
    .reduce((sum, action) => {
      const co2Value = action.co2 && action.co2 !== "N/A" 
        ? parseInt(action.co2.replace(/[^\d]/g, "")) 
        : 0;
      return sum + co2Value;
    }, 0);

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { text: "Good", color: "text-green-600 dark:text-green-400" };
    if (aqi <= 100) return { text: "Moderate", color: "text-yellow-600 dark:text-yellow-400" };
    if (aqi <= 150) return { text: "Unhealthy for Sensitive Groups", color: "text-orange-600 dark:text-orange-400" };
    if (aqi <= 200) return { text: "Unhealthy", color: "text-red-600 dark:text-red-400" };
    if (aqi <= 300) return { text: "Very Unhealthy", color: "text-purple-600 dark:text-purple-400" };
    return { text: "Hazardous", color: "text-rose-900 dark:text-rose-400" };
  };

  const aqiLevel = getAQILevel(aqiData.aqi);

  return (
    <div className="my-4 px-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-emerald-900/20 dark:to-teal-900/20 rounded-3xl shadow-xl p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 dark:text-green-400 mb-2 flex items-center gap-3 sm:gap-3 break-words">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              Improvement Measures
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Take action to improve air quality in your area
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Current AQI</p>
            <p className={`text-2xl sm:text-3xl font-bold${aqiLevel.color}`}>
              {aqiData.aqi}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{aqiLevel.text}</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Progress Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Progress
            </h3>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {completedCount}/{totalActions}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {progressPercentage.toFixed(0)}% Complete
          </p>
        </div>

        {/* Impact Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              CO₂ Saved
            </h3>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCO2Saved}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">kg per year</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Based on completed actions
          </p>
        </div>

        {/* Share Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2 mb-2">
                <Share2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Share Progress
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Inspire others to take action
              </p>
            </div>
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Copy & Share
            </button>
            {showShareMessage && (
              <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-center animate-pulse">
                ✓ Copied to clipboard!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            All Actions
          </button>
          {Object.entries(actionCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeCategory === key
                  ? `bg-${category.color}-500 text-white shadow-md`
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
              style={
                activeCategory === key
                  ? {
                      background:
                        category.color === "emerald"
                          ? "linear-gradient(to right, rgb(16, 185, 129), rgb(5, 150, 105))"
                          : category.color === "blue"
                          ? "linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))"
                          : "linear-gradient(to right, rgb(168, 85, 247), rgb(147, 51, 234))",
                    }
                  : {}
              }
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Actions List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          {activeCategory === "all" ? "All Recommended Actions" : actionCategories[activeCategory]?.name}
        </h2>

        <div className="space-y-3">
          {filteredActions.map((action) => {
            const isCompleted = completedActions[action.id];
            const impactColor =
              action.impact === "High"
                ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                : action.impact === "Medium"
                ? "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                : "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";

            return (
              <div
                key={action.id}
                onClick={() => toggleAction(action.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  isCompleted
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-400"
                    : "border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 bg-gray-50 dark:bg-gray-700/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-lg ${isCompleted ? 'bg-emerald-100 dark:bg-emerald-800/30 text-emerald-600 dark:text-emerald-400' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>
                    {React.cloneElement(action.icon, { className: "w-5 h-5" })}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base font-medium ${
                        isCompleted
                          ? "text-gray-500 dark:text-gray-400 line-through"
                          : "text-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {action.text}
                      {action.pollutantSpecific && (
                        <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                          Pollutant-Specific
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${impactColor}`}>
                        {action.impact} Impact
                      </span>
                      {action.co2 && action.co2 !== "N/A" && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                          💨 Saves {action.co2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No actions found in this category.</p>
          </div>
        )}
      </div>

      {/* Motivational Footer */}
      <div className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-6 h-6" />
          <h3 className="text-xl font-bold">Keep Going! 🌟</h3>
        </div>
        <p className="text-emerald-50">
          Every action counts! You're contributing to cleaner air and a healthier planet. 
          {completedCount > 0 && ` You've completed ${completedCount} action${completedCount > 1 ? 's' : ''} so far!`}
        </p>
      </div>
    </div>
  );
};

export default ImprovementMeasures;
