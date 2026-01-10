import { useEffect, useState } from "react";

export const useAQIData = () => {
  const [aqiData, setAqiData] = useState(null);
  const [completedActions, setCompletedActions] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("aqiData");
    const storedCompleted = localStorage.getItem("completedActions");

    if (storedData) setAqiData(JSON.parse(storedData));
    if (storedCompleted) setCompletedActions(JSON.parse(storedCompleted));
  }, []);

  const toggleAction = (id) => {
    const updated = { ...completedActions, [id]: !completedActions[id] };
    setCompletedActions(updated);
    localStorage.setItem("completedActions", JSON.stringify(updated));
  };

  return { aqiData, completedActions, toggleAction };
};
