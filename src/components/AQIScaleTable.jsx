import React from "react";

const aqiLevels = [
  {
    level: "Good",
    range: "0–50",
    color: "bg-green-500",
    health: "Air quality is considered satisfactory.",
    sensitive: "None",
  },
  {
    level: "Satisfactory",
    range: "51–100",
    color: "bg-yellow-400",
    health:
      "Air quality is acceptable; slight concern for a small number of sensitive individuals.",
    sensitive: "Sensitive individuals (e.g. asthma, allergies)",
  },
  {
    level: "Moderate",
    range: "101–200",
    color: "bg-orange-400",
    health:
      "May cause health issues for sensitive groups. Public unlikely to be affected.",
    sensitive: "Children, elderly, people with heart/lung disease",
  },
  {
    level: "Poor",
    range: "201–300",
    color: "bg-red-500",
    health:
      "Health effects may be experienced by everyone; sensitive groups may experience more serious effects.",
    sensitive: "General public & sensitive groups",
  },
  {
    level: "Very Poor",
    range: "301–400",
    color: "bg-red-800",
    health:
      "Health alert: everyone may experience more serious health effects.",
    sensitive: "Everyone, especially with medical conditions",
  },
  {
    level: "Severe",
    range: "401–500",
    color: "bg-gray-800",
    health: "Serious health effects. Emergency conditions likely.",
    sensitive: "Everyone. Avoid all outdoor exposure.",
  },
];

const AQIScaleTable = () => (
  <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-md w-full">
    <h3 className="text-2xl font-bold mb-6 text-gray-800">
      AQI Scale & Health Impact Guide
    </h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-base border-collapse overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4">Level</th>
            <th className="py-3 px-4">Range</th>
            <th className="py-3 px-4">Health Implications</th>
            <th className="py-3 px-4">Sensitive Groups</th>
          </tr>
        </thead>
        <tbody>
          {aqiLevels.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 hover:bg-gray-100 hover:scale-[1.01] transition-all duration-200 ease-in-out"
            >
              <td className="py-4 px-4">
                <span
                  className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${item.color}`}
                >
                  {item.level}
                </span>
              </td>
              <td className="py-4 px-4 font-medium text-gray-800">
                {item.range}
              </td>
              <td className="py-4 px-4 text-gray-700">{item.health}</td>
              <td className="py-4 px-4 text-gray-600 italic">
                {item.sensitive}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AQIScaleTable;
