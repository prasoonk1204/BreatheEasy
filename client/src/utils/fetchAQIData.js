const fetchProfileAndAQI = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not logged in");
  }

  // 1. Fetch user data from backend
  const userRes = await fetch("http://localhost:3001/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!userRes.ok) {
    if (userRes.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Session expired. Please login again.");
    }
    throw new Error("Failed to fetch user data");
  }

  const userData = await userRes.json();

  // 2. Fetch AQI data from WAQI API
  const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY;
  const aqiRes = await fetch(
    `https://api.waqi.info/feed/here/?token=${WAQI_API_KEY}`
  );
  const aqiData = await aqiRes.json();

  if (aqiData.status !== "ok") {
    throw new Error("Failed to fetch AQI data");
  }

  return {
    user: userData.user, // { username, credits, created_at }
    aqi: {
      value: aqiData.data.aqi,
      city: aqiData.data.city.name,
      dominentpol: aqiData.data.dominentpol,
      components: {
        pm25: aqiData.data.iaqi.pm25?.v,
        pm10: aqiData.data.iaqi.pm10?.v,
        o3: aqiData.data.iaqi.o3?.v,
        no2: aqiData.data.iaqi.no2?.v,
        so2: aqiData.data.iaqi.so2?.v,
        co: aqiData.data.iaqi.co?.v,
      },
      time: aqiData.data.time.iso,
    },
  };
};

export default fetchProfileAndAQI;
