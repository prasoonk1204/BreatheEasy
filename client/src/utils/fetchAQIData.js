const fetchAQIData = async () => {
  const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY

  const response = await fetch(
    `https://api.waqi.info/feed/here/?token=${WAQI_API_KEY}`
  );

  const data = await response.json();

  if (data.status !== "ok") {
    throw new Error(`Failed to fetch AQI data: ${data.data || data.status}`);
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
