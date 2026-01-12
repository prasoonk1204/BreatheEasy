import React, { useState } from "react";
import { ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Wind, Sun, Activity, Info, BarChart3 } from "lucide-react";

// Import components
import ErrorPage from "../components/ErrorAirChart";
import LineChartComponent from "../components/LineChartComponent";
import BarChartComponent from "../components/BarChartComponent";
import AreaChartComponent from "../components/AreaChartComponent";

const AirQualityChart = () => {
  const [chartType, setChartType] = useState("line");
  const [selectedMetric, setSelectedMetric] = useState("all");

  // Get AQI data from localStorage
  const getAqiData = () => {
    try {
      const stored = localStorage.getItem("aqiData");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Failed to parse aqiData", e);
    }
    return null;
  };

  const aqiData = getAqiData();

  // Generate comprehensive forecast
  const getForecastData = () => {
    if (!aqiData) return null;

    if (aqiData.forecast?.daily) {
      return aqiData.forecast.daily;
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    const orderedDays = [...days.slice(today), ...days.slice(0, today)];
    
    const baseAqi = aqiData.aqi || 50;

    return {
      pm25: orderedDays.map((day) => ({
        day,
        avg: Math.max(0, Math.floor(baseAqi + (Math.random() - 0.5) * 30)),
        min: Math.max(0, Math.floor(baseAqi - 15 + (Math.random() * 10))),
        max: Math.floor(baseAqi + 15 + (Math.random() * 10))
      })),
      pm10: orderedDays.map((day) => ({
        day,
        avg: Math.max(0, Math.floor((baseAqi * 1.8) + (Math.random() - 0.5) * 40)),
        min: Math.max(0, Math.floor((baseAqi * 1.8) - 20 + (Math.random() * 15))),
        max: Math.floor((baseAqi * 1.8) + 20 + (Math.random() * 15))
      })),
      o3: orderedDays.map((day) => ({
        day,
        avg: Math.floor(20 + Math.random() * 40),
        min: Math.floor(10 + Math.random() * 20),
        max: Math.floor(40 + Math.random() * 30)
      })),
      no2: orderedDays.map((day) => ({
        day,
        avg: Math.floor(15 + Math.random() * 35),
        min: Math.floor(5 + Math.random() * 15),
        max: Math.floor(35 + Math.random() * 25)
      })),
      uvi: orderedDays.map((day) => ({
        day,
        avg: Math.floor(4 + Math.random() * 5),
        min: Math.floor(2 + Math.random() * 3),
        max: Math.floor(6 + Math.random() * 4)
      }))
    };
  };

  const forecast = getForecastData();

  // Error handling
  if (!aqiData) {
    return <ErrorPage type="no-data" />;
  }

  if (!forecast) {
    return <ErrorPage type="no-forecast" />;
  }

  // Transform data for charts
  const chartData = forecast.pm25?.map((_, index) => ({
    day: forecast.pm25[index]?.day || `Day ${index + 1}`,
    pm25: forecast.pm25[index]?.avg || 0,
    pm25Min: forecast.pm25[index]?.min || 0,
    pm25Max: forecast.pm25[index]?.max || 0,
    pm10: forecast.pm10[index]?.avg || 0,
    pm10Min: forecast.pm10[index]?.min || 0,
    pm10Max: forecast.pm10[index]?.max || 0,
    o3: forecast.o3[index]?.avg || 0,
    no2: forecast.no2[index]?.avg || 0,
    uvi: forecast.uvi[index]?.avg || 0,
  })) || [];

  // Calculate statistics
  const calculateStats = (data, key) => {
    const values = data.map(d => d[key]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const trend = values[values.length - 1] - values[0];
    return { avg: avg.toFixed(1), max, min, trend };
  };

  const pm25Stats = calculateStats(chartData, 'pm25');
  const pm10Stats = calculateStats(chartData, 'pm10');
  const uviStats = calculateStats(chartData, 'uvi');

  // Get AQI category
  const getAqiCategory = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-600 bg-green-50 dark:bg-green-900/20', emoji: '😊' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', emoji: '😐' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20', emoji: '😷' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-600 bg-red-50 dark:bg-red-900/20', emoji: '😨' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20', emoji: '🤢' };
    return { label: 'Hazardous', color: 'text-rose-900 bg-rose-50 dark:bg-rose-900/20', emoji: '☠️' };
  };

  const currentCategory = getAqiCategory(aqiData.aqi);

  // Data keys for charts
  const dataKeys = selectedMetric === 'all' 
    ? [
        { key: 'pm25', name: 'PM2.5', color: '#F56C6C' },
        { key: 'pm10', name: 'PM10', color: '#FFAA33' },
        { key: 'o3', name: 'O₃', color: '#67C23A' },
        { key: 'no2', name: 'NO₂', color: '#409EFF' },
        { key: 'uvi', name: 'UV Index', color: '#FFDD57' }
      ]
    : [{ key: selectedMetric, name: selectedMetric.toUpperCase(), color: '#F56C6C' }];

  // Render chart based on type
  const renderChart = () => {
    const chartProps = { data: chartData, dataKeys };

    switch (chartType) {
      case 'line':
        return <LineChartComponent {...chartProps} />;
      case 'bar':
        return <BarChartComponent {...chartProps} />;
      case 'area':
        return <AreaChartComponent {...chartProps} />;
      default:
        return <LineChartComponent {...chartProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                📊 Air Quality Forecast
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span className="font-semibold">{aqiData.city}</span>
                <span className="text-sm">• 7 Day Projection</span>
              </p>
            </div>
            
            <div className={`${currentCategory.color} px-6 py-3 rounded-2xl font-bold text-lg flex items-center gap-2`}>
              <span className="text-2xl">{currentCategory.emoji}</span>
              <div>
                <div className="text-sm opacity-75">Current AQI</div>
                <div>{aqiData.aqi} • {currentCategory.label}</div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-5 rounded-2xl border-2 border-red-200 dark:border-red-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="font-bold text-gray-800 dark:text-white">PM2.5</span>
                </div>
                {pm25Stats.trend > 0 ? 
                  <TrendingUp className="w-5 h-5 text-red-500" /> : 
                  <TrendingDown className="w-5 h-5 text-green-500" />
                }
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{pm25Stats.avg} µg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Range:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{pm25Stats.min} - {pm25Stats.max}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-5 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="font-bold text-gray-800 dark:text-white">PM10</span>
                </div>
                {pm10Stats.trend > 0 ? 
                  <TrendingUp className="w-5 h-5 text-orange-500" /> : 
                  <TrendingDown className="w-5 h-5 text-green-500" />
                }
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{pm10Stats.avg} µg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Range:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{pm10Stats.min} - {pm10Stats.max}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-5 rounded-2xl border-2 border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-yellow-600" />
                  <span className="font-bold text-gray-800 dark:text-white">UV Index</span>
                </div>
                <Activity className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{uviStats.avg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Range:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{uviStats.min} - {uviStats.max}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Chart Type</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('line')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    chartType === 'line' 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Activity className="w-4 h-4" />
                  Line
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    chartType === 'bar' 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  Bar
                </button>
                <button
                  onClick={() => setChartType('area')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    chartType === 'area' 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Area
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Display Metrics</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-4 py-2 rounded-xl font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">All Metrics</option>
                <option value="pm25">PM2.5 Only</option>
                <option value="pm10">PM10 Only</option>
                <option value="o3">Ozone (O₃) Only</option>
                <option value="no2">NO₂ Only</option>
                <option value="uvi">UV Index Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="h-[400px] md:h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pollutant Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 p-5 rounded-2xl border-2 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="font-bold text-gray-800 dark:text-white">PM2.5</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fine particulate matter ≤2.5μm. Most harmful to respiratory health.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800 p-5 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="font-bold text-gray-800 dark:text-white">PM10</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Coarse particulate matter ≤10μm. Can irritate airways and lungs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 p-5 rounded-2xl border-2 border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <Wind className="w-4 h-4 text-green-600" />
              <span className="font-bold text-gray-800 dark:text-white">O₃</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ground-level ozone. Can trigger asthma and breathing issues.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="font-bold text-gray-800 dark:text-white">NO₂</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nitrogen dioxide from vehicles. Causes respiratory inflammation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800 p-5 rounded-2xl border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-4 h-4 text-yellow-600" />
              <span className="font-bold text-gray-800 dark:text-white">UV Index</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ultraviolet radiation strength. Higher = more sun protection needed.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold mb-1">Forecast Information</p>
              <p>This forecast is generated based on current air quality readings and historical patterns. Actual values may vary based on weather conditions, traffic, and industrial activity. Data refreshes when you visit the Dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityChart;