// src/pages/ExploreAQI.jsx
import React, { useState, useEffect } from 'react';

import { fetchAqiByCity, fetchTopCitiesAQI } from '../services/apiService';
import MapComponent from '../components/MapComponent';

const ExploreAQI = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedAqiData, setSearchedAqiData] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);


  const [topIndianCitiesAQI, setTopIndianCitiesAQI] = useState([]);
  const [topGlobalCitiesAQI, setTopGlobalCitiesAQI] = useState([]);

  const [rankingsLoading, setRankingsLoading] = useState(false);
  const [rankingsError, setRankingsError] = useState(null);

  useEffect(() => {
    const getTopCitiesData = async () => { // Renamed for clarity
      setRankingsLoading(true);
      setRankingsError(null);
      try {

        const data = await fetchTopCitiesAQI();

        setTopIndianCitiesAQI(data.top5IndianCities);
        setTopGlobalCitiesAQI(data.top5GlobalCities);
      } catch (err) {
        console.error("Error fetching top cities AQI data:", err);
        setRankingsError("Failed to load top cities AQI data. Please try again later.");
      } finally {
        setRankingsLoading(false);
      }
    };

    getTopCitiesData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Please enter a city, zip code, or address.");
      setSearchedAqiData(null);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);
    setSearchedAqiData(null);

    try {
      const data = await fetchAqiByCity(searchQuery.trim());
      setSearchedAqiData(data);
    } catch (err) {
      console.error("Error fetching AQI for search query:", err);
      setSearchError(err.message || "Could not find AQI data. Try a different input.");
    } finally {
      setSearchLoading(false);
    }
  };

  const renderAqiDetails = (data) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-green-400">
        AQI for {data.city}
      </h3>
      <div className="flex items-center space-x-4 mb-4">
        <div className={`text-4xl font-bold p-3 rounded-full
          ${data.aqi <= 50 ? 'bg-green-500' :
            data.aqi <= 100 ? 'bg-yellow-500' :
              data.aqi <= 150 ? 'bg-orange-500' :
                data.aqi <= 200 ? 'bg-red-500' :
                  data.aqi <= 300 ? 'bg-green-700' :
                    'bg-rose-900'} text-white`}>
          {data.aqi}
        </div>
        <div>
          <p className="text-lg font-medium">Dominant Pollutant: <span className="font-semibold uppercase">{data.dominentpol || 'N/A'}</span></p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated: {new Date(data.time).toLocaleString()}</p>
        </div>
      </div>

      <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">Pollutant Concentrations (μg/m³):</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700 dark:text-gray-300">
        {Object.entries(data.components || {}).map(([key, value]) => (
          value !== undefined && (
            <div key={key} className="flex justify-center items-center space-x-2 bg-gray-100 dark:bg-gray-700 w-30 px-4 py-1 rounded-xl">
              <span className="font-medium uppercase">{key}:</span>
              <span>{value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );

  const renderRankingList = (title, cities) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-green-400">{title}</h3>
      {cities.length > 0 ? (
        <ul className="space-y-2">
          {cities.map((city, index) => (
            <li key={index} className="flex justify-between items-center text-gray-800 dark:text-gray-200">
              <span className="font-medium">{city.city}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold w-20 text-center
                ${city.aqi <= 50 ? 'bg-green-100 text-green-800' :
                  city.aqi <= 100 ? 'bg-yellow-100 text-yellow-800' :
                    city.aqi <= 150 ? 'bg-orange-100 text-orange-800' :
                      city.aqi <= 200 ? 'bg-red-100 text-red-800' :
                        city.aqi <= 300 ? 'bg-green-100 text-green-800' :
                          'bg-rose-100 text-rose-800'}`}>
                AQI: {city.aqi}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">No data available.</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white rounded-3xl">
      <h2 className="text-3xl font-bold text-center text-emerald-700 dark:text-green-500 mb-6">Explore Air Quality around the World</h2>

      {/* Search Section */}
      <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-5 text-emerald-600 dark:text-green-400">Search AQI by Location</h3>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name (e.g., London, Delhi)"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-700"
            disabled={searchLoading}
          >
            {searchLoading ? 'Searching...' : 'Search AQI'}
          </button>
        </form>

        {searchError && <p className="text-red-600 dark:text-red-400 text-center mb-4">{searchError}</p>}

        {searchedAqiData && renderAqiDetails(searchedAqiData)}

        {!searchedAqiData && !searchLoading && !searchError && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
            Search for a city to see its Air Quality Index and map.
          </p>
        )}

        {/* Map Component */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-3 text-gray-700 dark:text-gray-300">Air Quality Map</h4>
          {searchLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading map...</p>}
          {searchError && !searchLoading && <p className="text-red-600 dark:text-red-400 text-center">Map could not load due to search error.</p>}
          <MapComponent
            // Default center is Kolkata if no city is searched
            centerLatitude={searchedAqiData?.latitude || 22.5726}
            centerLongitude={searchedAqiData?.longitude || 88.3639}
            zoom={searchedAqiData ? 10 : 11}
          />
        </div>
      </section>

      {/* Top Cities AQI Section */}
      <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* IMPT: Updated section title */}
        <h3 className="text-2xl font-semibold mb-5 text-emerald-600 dark:text-green-400">Top Cities Air Quality</h3>
        {rankingsLoading && <p className="text-center text-gray-500 dark:text-gray-400">Loading top cities AQI...</p>}
        {rankingsError && <p className="text-red-600 dark:text-red-400 text-center">{rankingsError}</p>}
        {!rankingsLoading && !rankingsError && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {renderRankingList("Top 5 Indian Cities", topIndianCitiesAQI)}
            {renderRankingList("Top 5 Global Cities ", topGlobalCitiesAQI)}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExploreAQI;