const fetchAQIData = async () => {
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/aqi` || "http://localhost:3000/api/aqi";

  const response = await fetch(
    `${API_BASE_URL}/current-location`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error("Failed to fetch AQI data");
  }

  return {
    aqi: data.data.aqi,
    components: {
      pm25: data.data.iaqi.pm25?.v,
      pm10: data.data.iaqi.pm10?.v,
      o3: data.data.iaqi.o3?.v,
      no2: data.data.iaqi.no2?.v,
      so2: data.data.iaqi.so2?.v,
      co: data.data.iaqi.co?.v,
    },
    city: data.data.city.name,
    time: data.data.time.iso,
    forecast: data.data.forecast,
    dominentpol: data.data.dominentpol,

  };
};

export default fetchAQIData;
