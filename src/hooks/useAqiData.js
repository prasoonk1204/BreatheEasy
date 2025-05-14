import { useEffect, useState } from "react";

const useAqiData = () => {
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("aqiData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAqiData(parsed);
      } catch (e) {
        console.error("Failed to parse aqiData from localStorage", e);
      }
    }
  }, []);

  return aqiData;
};

export default useAqiData;
