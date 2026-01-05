// src/services/apiService.js

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/aqi` || "http://localhost:3000/api/aqi";

const parseWaqiData = (data) => {
  if (data.status !== "ok" || !data.data) {
    throw new Error(data.data?.message || "Failed to fetch AQI data");
  }

  const cityData = data.data;

  return {
    aqi: cityData.aqi,
    components: {
      pm25: cityData.iaqi.pm25?.v,
      pm10: cityData.iaqi.pm10?.v,
      o3: cityData.iaqi.o3?.v,
      no2: cityData.iaqi.no2?.v,
      so2: cityData.iaqi.so2?.v,
      co: cityData.iaqi.co?.v,
    },
    city: cityData.city.name,
    latitude: cityData.city.geo ? cityData.city.geo[0] : null,
    longitude: cityData.city.geo ? cityData.city.geo[1] : null,
    time: cityData.time.iso,
    dominentpol: cityData.dominentpol,
  };
};

// Fetches AQI for the current location
export const fetchAqiForCurrentLocation = async () => {
  try {
     // Try to get geolocation from browser to pass to backend
     // If not available or denied, fallback to simple request which uses server IP
     const getPosition = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation not supported"));
                return;
            }
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
     };

     let url = `${API_BASE_URL}/current-location`;
     
     try {
        const position = await getPosition();
        url += `?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
     } catch (e) {
        console.warn("Geolocation permission denied or not available, falling back to IP-based location.", e);
     }

    const response = await fetch(url);
    const data = await response.json();
    return parseWaqiData(data);
  } catch (error) {
    console.error("Error fetching AQI for current location:", error);
    throw error;
  }
};

// Fetches AQI for a specific city
export const fetchAqiByCity = async (cityName) => {
  if (!cityName) throw new Error("City name cannot be empty.");
  try {
    const encodedCityName = encodeURIComponent(cityName.toLowerCase());
    const response = await fetch(`${API_BASE_URL}/city/${encodedCityName}`);
    const data = await response.json();
    return parseWaqiData(data);
  } catch (error) {
    console.error(`Error fetching AQI for ${cityName}:`, error);
    throw error;
  }
};


export const fetchTopCitiesAQI = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/top-cities`);
      const data = await response.json();
      return data; // The backend already returns { top5IndianCities: [], top5GlobalCities: [] }
  } catch (error) {
      console.error("Error fetching top cities AQI:", error);
      throw error;
  }
};

