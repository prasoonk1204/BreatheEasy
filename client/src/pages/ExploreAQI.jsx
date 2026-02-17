import React, { useState, useEffect, useRef } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { fetchAqiByCity, fetchTopCitiesAQI } from '../services/apiService';
import { exportSearchData } from '../utils/exportSearchData';
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

  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef(null);

  /* ================= CLOSE EXPORT DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportRef.current && !exportRef.current.contains(event.target)) {
        setExportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ================= FETCH TOP CITIES ================= */
  useEffect(() => {
    const getTopCitiesData = async () => {
      setRankingsLoading(true);
      setRankingsError(null);
      try {
        const data = await fetchTopCitiesAQI();
        setTopIndianCitiesAQI(data.top5IndianCities);
        setTopGlobalCitiesAQI(data.top5GlobalCities);
      } catch (err) {
        console.error("Error fetching top cities AQI data:", err);
        setRankingsError("Failed to load top cities AQI data.");
      } finally {
        setRankingsLoading(false);
      }
    };

    getTopCitiesData();
  }, []);

  /* ================= SEARCH ================= */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError("Please enter a city.");
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
      setSearchError(err.message || "Could not fetch AQI data.");
    } finally {
      setSearchLoading(false);
    }
  };

  /* ================= RENDER AQI DETAILS ================= */
  const renderAqiDetails = (data) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative">

      {/* Header + Export Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-emerald-600 dark:text-green-400">
          AQI for {data.city}
        </h3>

        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
            bg-emerald-600 hover:bg-emerald-700 
            text-white text-sm shadow-md transition cursor-pointer"
          >
            <Download size={16} />
            Export
            <ChevronDown size={16} />
          </button>

          {exportOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 
              rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">

              <button
                onClick={() => {
                  exportSearchData("csv",searchedAqiData);
                  setExportOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm
                hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                Export as CSV
              </button>

              <button
                onClick={() => {
                  exportSearchData("pdf",searchedAqiData);
                  setExportOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm
                hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
              >
                Export as PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* AQI Card */}
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
          <p className="text-lg font-medium">
            Dominant Pollutant:
            <span className="font-semibold uppercase">
              {" "}{data.dominentpol || 'N/A'}
            </span>
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Last Updated:
            <span className='notranslate'>
              {" "}{new Date(data.time).toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Pollutants */}
      <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">
        Pollutant Concentrations <span className='notranslate'>(ug/m3)</span>:
      </h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(data.components || {}).map(([key, value]) => (
          value !== undefined && (
            <div key={key} className="flex justify-center items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-xl">
              <span className="font-medium uppercase notranslate">{key}:</span>
              <span className='notranslate'>{value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );

  /* ================= RENDER RANKINGS ================= */
  const renderRankingList = (title, cities) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-3 text-emerald-600 dark:text-green-400">
        {title}
      </h3>

      {cities.length > 0 ? (
        <ul className="space-y-2">
          {cities.map((city, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{city.city}</span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 dark:bg-gray-700">
                AQI: {city.aqi}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-8 dark:bg-gray-900 min-h-screen rounded-3xl">

      <h2 className="text-3xl font-bold text-center text-emerald-700 dark:text-green-500">
        Explore Air Quality around the World
      </h2>

      {/* Search Section */}
      <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-5 text-emerald-600 dark:text-green-400">
          Search AQI by Location
        </h3>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name (e.g., London, Delhi)"
            className="flex-grow p-3 border rounded-lg dark:bg-gray-700"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
            disabled={searchLoading}
          >
            {searchLoading ? 'Searching...' : 'Search AQI'}
          </button>
        </form>

        {searchError && <p className="text-red-500 text-center">{searchError}</p>}
        {searchedAqiData && renderAqiDetails(searchedAqiData)}

        <div className="mt-6">
          <MapComponent
            centerLatitude={searchedAqiData?.latitude || 22.5726}
            centerLongitude={searchedAqiData?.longitude || 88.3639}
            zoom={searchedAqiData ? 10 : 11}
          />
        </div>
      </section>

      {/* Rankings Section */}
      <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow-lg border dark:border-gray-700">
        <h3 className="text-2xl font-semibold mb-5 text-emerald-600 dark:text-green-400">
          Top Cities Air Quality
        </h3>

        {rankingsLoading && <p>Loading...</p>}
        {rankingsError && <p className="text-red-500">{rankingsError}</p>}

        {!rankingsLoading && !rankingsError && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderRankingList("Top 5 Indian Cities", topIndianCitiesAQI)}
            {renderRankingList("Top 5 Global Cities", topGlobalCitiesAQI)}
          </div>
        )}
      </section>
    </div>
  );
};

export default ExploreAQI;
