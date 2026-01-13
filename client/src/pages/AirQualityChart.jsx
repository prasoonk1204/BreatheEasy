import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, Wind, Sun, Activity, Info, BarChart3, AlertCircle } from "lucide-react";

import ErrorPage from "../components/ErrorAirChart"

const LineChartComponent = ({ data, dataKeys }) => (
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
    <XAxis dataKey="day" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: '#fff', 
        border: '2px solid #e0e0e0', 
        borderRadius: '12px',
        padding: '12px'
      }} 
    />
    <Legend />
    {dataKeys.map(({ key, name, color }) => (
      <Line 
        key={key}
        type="monotone" 
        dataKey={key} 
        stroke={color} 
        strokeWidth={3}
        name={name}
        dot={{ fill: color, r: 4 }}
        activeDot={{ r: 6 }}
      />
    ))}
  </LineChart>
);

const BarChartComponent = ({ data, dataKeys }) => (
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
    <XAxis dataKey="day" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: '#fff', 
        border: '2px solid #e0e0e0', 
        borderRadius: '12px',
        padding: '12px'
      }} 
    />
    <Legend />
    {dataKeys.map(({ key, name, color }) => (
      <Bar 
        key={key}
        dataKey={key} 
        fill={color} 
        name={name}
        radius={[8, 8, 0, 0]}
      />
    ))}
  </BarChart>
);

const AreaChartComponent = ({ data, dataKeys }) => (
  <AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
    <XAxis dataKey="day" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip 
      contentStyle={{ 
        backgroundColor: '#fff', 
        border: '2px solid #e0e0e0', 
        borderRadius: '12px',
        padding: '12px'
      }} 
    />
    <Legend />
    {dataKeys.map(({ key, name, color }) => (
      <Area
        key={key}
        type="monotone"
        dataKey={key}
        stroke={color}
        fill={color}
        fillOpacity={0.6}
        name={name}
      />
    ))}
  </AreaChart>
);

const AirQualityChart = () => {
  const [chartType, setChartType] = useState("line");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const stored = localStorage.getItem("aqiData");
        if (stored) {
          const parsed = JSON.parse(stored);
          setAqiData(parsed);
        }
      } catch (e) {
        console.error("Failed to parse aqiData", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    const handleStorageChange = (e) => {
      if (e.key === 'aqiData') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Parsing thea forecast data 
  const getForecastData = () => {
    if (!aqiData?.data?.forecast) return null;

    const forecast = aqiData.data.forecast;
    
    //PM2.5, PM10, O3
    const processWaqiForecast = (forecastArray) => {
      if (!forecastArray || forecastArray.length === 0) return [];
      
      return forecastArray.map((item) => {
        const date = new Date(item.day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        
        return {
          day: dayName,
          avg: Math.round(item.avg || 0),
          min: Math.round(item.min || 0),
          max: Math.round(item.max || 0)
        };
      });
    };

    const result = {
      pm25: processWaqiForecast(forecast.daily?.pm25),
      pm10: processWaqiForecast(forecast.daily?.pm10),
      o3: processWaqiForecast(forecast.daily?.o3)
    };

    // Check if we have ANY forecast data from WAQI
    if (result.pm25.length === 0 && result.pm10.length === 0 && result.o3.length === 0) {
      return null;
    }

    // Return ONLY the data WAQI provides - no padding, no generation
    return result;
  };

  const forecast = getForecastData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading air quality data...</p>
        </div>
      </div>
    );
  }

  if (!aqiData || !aqiData.data) {
    return <ErrorPage type="no-data" message="Unable to read the Data Currently,Try Again Later." />;
  }

  if (!forecast) {
    return <ErrorPage 
      type="no-forecast" 
      message="WAQI API provides limited forecast data. The chart shows current readings and available historical trends." 
    />;
  }

  // Transform data for charts - USE ONLY ACTUAL FORECAST DATA
  const chartData = [];
  
  // Find the maximum length from available forecast arrays
  const maxLength = Math.max(
    forecast.pm25?.length || 0,
    forecast.pm10?.length || 0,
    forecast.o3?.length || 0
  );

  // Build chart data using only what WAQI provides
  for (let i = 0; i < maxLength; i++) {
    const dataPoint = {
      day: forecast.pm25?.[i]?.day || forecast.pm10?.[i]?.day || forecast.o3?.[i]?.day || `Day ${i + 1}`,
    };

    // Only add data if WAQI provides it
    if (forecast.pm25?.[i]) {
      dataPoint.pm25 = forecast.pm25[i].avg;
      dataPoint.pm25Min = forecast.pm25[i].min;
      dataPoint.pm25Max = forecast.pm25[i].max;
    }

    if (forecast.pm10?.[i]) {
      dataPoint.pm10 = forecast.pm10[i].avg;
      dataPoint.pm10Min = forecast.pm10[i].min;
      dataPoint.pm10Max = forecast.pm10[i].max;
    }

    if (forecast.o3?.[i]) {
      dataPoint.o3 = forecast.o3[i].avg;
    }

    chartData.push(dataPoint);
  }

  const calculateStats = (data, key) => {
    const values = data.map(d => d[key]).filter(v => v > 0);
    if (values.length === 0) return { avg: '0', max: 0, min: 0, trend: 0 };
    
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const trend = values[values.length - 1] - values[0];
    return { avg: avg.toFixed(1), max, min, trend };
  };

  const pm25Stats = calculateStats(chartData, 'pm25');
  const pm10Stats = calculateStats(chartData, 'pm10');
  const o3Stats = calculateStats(chartData, 'o3');

  const getAqiCategory = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-green-600 bg-green-50 dark:bg-green-900/20', emoji: '😊' };
    if (aqi <= 100) return { label: 'Moderate', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', emoji: '😐' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20', emoji: '😷' };
    if (aqi <= 200) return { label: 'Unhealthy', color: 'text-red-600 bg-red-50 dark:bg-red-900/20', emoji: '😨' };
    if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20', emoji: '🤢' };
    return { label: 'Hazardous', color: 'text-rose-900 bg-rose-50 dark:bg-rose-900/20', emoji: '☠️' };
  };

  const currentCategory = getAqiCategory(aqiData.data.aqi);

  const dataKeys = selectedMetric === 'all' 
    ? [
        { key: 'pm25', name: 'PM2.5', color: '#F56C6C' },
        { key: 'pm10', name: 'PM10', color: '#FFAA33' },
        { key: 'o3', name: 'O₃', color: '#67C23A' }
      ]
    : [{ key: selectedMetric, name: selectedMetric.toUpperCase(), color: '#F56C6C' }];

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
                📊 Air Quality Trends
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span className="text-xl">📍</span>
                <span className="font-semibold">{aqiData.data.city?.name || 'Unknown Location'}</span>
                <span className="text-sm">• Historical & Current Data</span>
              </p>
            </div>
            
            <div className={`${currentCategory.color} px-6 py-3 rounded-2xl font-bold text-lg flex items-center gap-2`}>
              <span className="text-2xl">{currentCategory.emoji}</span>
              <div>
                <div className="text-sm opacity-75">Current AQI</div>
                <div>{aqiData.data.aqi} • {currentCategory.label}</div>
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

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-5 rounded-2xl border-2 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-800 dark:text-white">O₃</span>
                </div>
                {o3Stats.trend > 0 ? 
                  <TrendingUp className="w-5 h-5 text-green-500" /> : 
                  <TrendingDown className="w-5 h-5 text-blue-500" />
                }
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{o3Stats.avg} µg/m³</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Range:</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{o3Stats.min} - {o3Stats.max}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>

        {/* Footer Note */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="font-semibold mb-1">Data Source: WAQI API</p>
              <p>This chart displays real-time air quality data from the World Air Quality Index (WAQI). The forecast shows historical trends and current readings. Data is cached for 5 minutes to optimize performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityChart;