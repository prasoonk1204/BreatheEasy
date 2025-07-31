// src/services/apiService.js

const WAQI_API_BASE_URL = "https://api.waqi.info/feed/";
const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY;

if (!WAQI_API_KEY) {
  console.error("VITE_WAQI_API_KEY is not defined. Please check your .env file.");
}

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

// Fetches AQI for the current location (using "here")
export const fetchAqiForCurrentLocation = async () => {
  try {
    const response = await fetch(`${WAQI_API_BASE_URL}here/?token=${WAQI_API_KEY}`);
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
    const response = await fetch(`${WAQI_API_BASE_URL}${encodedCityName}/?token=${WAQI_API_KEY}`);
    const data = await response.json();
    return parseWaqiData(data);
  } catch (error) {
    console.error(`Error fetching AQI for ${cityName}:`, error);
    throw error;
  }
};


export const fetchTopCitiesAQI = async () => {
  
  const indianCities = ["New Delhi", "Mumbai", "Kolkata", "Bengaluru", "Chennai"]; 
  
  const globalCities = ["Beijing", "New York", "London", "Singapore", "Paris"];

  const fetchAQIsForList = async (cities) => {
    const results = [];
    for (const city of cities) {
      try {
        const data = await fetchAqiByCity(city);
        results.push({ city: data.city, aqi: data.aqi });
      } catch (error) {
        
        console.warn(`Could not fetch AQI for ${city}:`, error.message);
      }
    }
    
    return results.sort((a, b) => a.aqi - b.aqi);
  };

  const [indianCityAQIs, globalCityAQIs] = await Promise.all([
    fetchAQIsForList(indianCities),
    fetchAQIsForList(globalCities),
  ]);

  return {
    top5IndianCities: indianCityAQIs,
    top5GlobalCities: globalCityAQIs,
  };
};

