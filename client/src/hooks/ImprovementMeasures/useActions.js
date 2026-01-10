import {
  Car, Bus, Bike, Home, Lightbulb, Trees, Leaf,
  Users, Megaphone, Scale, Factory, Wind
} from "lucide-react";

export const useActions = (aqi, dominantPollutant) => {
  const actions = { personal: [], community: [], policy: [] };

  // 👇 SAME PERSONAL LOGIC
  if (aqi <= 50) {
    actions.personal = [
      { id: "p1", text: "Continue using public transport or carpooling", icon: <Bus />, impact: "High", co2: "500kg/year" },
      { id: "p2", text: "Maintain energy-efficient appliances at home", icon: <Lightbulb />, impact: "Medium", co2: "200kg/year" },
      { id: "p3", text: "Keep indoor plants to naturally purify air", icon: <Leaf />, impact: "Low", co2: "50kg/year" },
      { id: "p4", text: "Walk or bike for short distances", icon: <Bike />, impact: "High", co2: "300kg/year" },
    ];
  }
  if (dominantPollutant === "pm25" || dominantPollutant === "pm10") {
    actions.personal.unshift({
      id: "pp1",
      text: "Use air purifiers to filter particulate matter",
      icon: <Wind />,
      impact: "High",
      co2: "N/A",
      pollutantSpecific: true,
    });
  }

  return actions;
};
