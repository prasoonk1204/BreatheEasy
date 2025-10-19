import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Heart, Users, Shield } from "lucide-react";

// Create motion components to satisfy linting
const MotionDiv = motion.div;
const MotionTr = motion.tr;

const aqiLevels = [
  {
    level: "Good",
    range: "0–50",
    color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    borderColor: "border-emerald-500",
    health: "Air quality is considered satisfactory and poses little to no health risk.",
    sensitive: "None",
    icon: Shield,
    emoji: "😊"
  },
  {
    level: "Satisfactory",
    range: "51–100",
    color: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    borderColor: "border-yellow-400",
    health: "Air quality is acceptable with slight concern for very sensitive individuals.",
    sensitive: "Sensitive individuals (asthma, allergies)",
    icon: Users,
    emoji: "🙂"
  },
  {
    level: "Moderate",
    range: "101–200",
    color: "bg-gradient-to-r from-orange-400 to-orange-500",
    borderColor: "border-orange-400",
    health: "May cause health issues for sensitive groups. General public unlikely to be affected.",
    sensitive: "Children, elderly, people with heart/lung disease",
    icon: AlertTriangle,
    emoji: "😐"
  },
  {
    level: "Poor",
    range: "201–300",
    color: "bg-gradient-to-r from-red-500 to-red-600",
    borderColor: "border-red-500",
    health: "Health effects may be experienced by everyone; sensitive groups may have serious effects.",
    sensitive: "General public & sensitive groups",
    icon: Heart,
    emoji: "😷"
  },
  {
    level: "Very Poor",
    range: "301–400",
    color: "bg-gradient-to-r from-red-700 to-red-800",
    borderColor: "border-red-700",
    health: "Health alert: everyone may experience more serious health effects.",
    sensitive: "Everyone, especially with medical conditions",
    icon: AlertTriangle,
    emoji: "🤢"
  },
  {
    level: "Severe",
    range: "401–500",
    color: "bg-gradient-to-r from-gray-800 to-gray-900",
    borderColor: "border-gray-800",
    health: "Emergency conditions. Serious health effects for entire population.",
    sensitive: "Everyone. Avoid all outdoor exposure.",
    icon: AlertTriangle,
    emoji: "☠️"
  },
];

const AQIScaleTable = () => (
  <MotionDiv 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="card backdrop-blur-xl p-8 w-full relative overflow-hidden"
  >
    {/* Header */}
    <MotionDiv
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <h3 className="text-3xl font-bold mb-2 text-gradient-cosmic">
        AQI Scale & Health Impact Guide
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Understanding air quality levels and their health implications
      </p>
    </MotionDiv>

    {/* Desktop Table */}
    <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
            <th className="py-4 px-6 text-left font-semibold text-gray-800 dark:text-gray-200">Quality Level</th>
            <th className="py-4 px-6 text-left font-semibold text-gray-800 dark:text-gray-200">AQI Range</th>
            <th className="py-4 px-6 text-left font-semibold text-gray-800 dark:text-gray-200">Health Implications</th>
            <th className="py-4 px-6 text-left font-semibold text-gray-800 dark:text-gray-200">Sensitive Groups</th>
          </tr>
        </thead>
        <tbody>
          {aqiLevels.map((item, index) => {
            const Icon = item.icon;
            return (
              <MotionTr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <td className="py-6 px-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <span className={`inline-block text-white text-sm font-bold px-4 py-2 rounded-full ${item.color} shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                        {item.level}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-6 px-6">
                  <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
                    {item.range}
                  </span>
                </td>
                <td className="py-6 px-6">
                  <div className="flex items-start gap-2">
                    <Icon size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.health}
                    </span>
                  </div>
                </td>
                <td className="py-6 px-6">
                  <span className="text-gray-600 dark:text-gray-400 italic">
                    {item.sensitive}
                  </span>
                </td>
              </MotionTr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}
    <div className="lg:hidden space-y-4">
      {aqiLevels.map((item, index) => {
        const Icon = item.icon;
        return (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className={`card p-6 border-l-4 ${item.borderColor} hover-lift`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{item.emoji}</span>
              <span className={`text-white text-sm font-bold px-3 py-1 rounded-full ${item.color}`}>
                {item.level}
              </span>
              <span className="ml-auto font-bold text-lg text-gray-800 dark:text-gray-100">
                {item.range}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Icon size={16} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Health Impact</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {item.health}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Sensitive Groups</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                  {item.sensitive}
                </p>
              </div>
            </div>
          </MotionDiv>
        );
      })}
    </div>

    {/* Decorative elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200 to-cyan-200 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-full blur-2xl opacity-30" />
  </MotionDiv>
);

export default AQIScaleTable;
