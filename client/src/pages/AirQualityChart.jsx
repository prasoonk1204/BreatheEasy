import React from "react";
import useAqiData from "../hooks/useAqiData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AirQualityChart = () => {
  const aqiData = useAqiData();
  const forecast = aqiData?.forecast?.daily;

  if (!forecast) return null;

  const chartData = {
    labels: forecast.pm25.map((d) => d.day),
    datasets: [
      {
        label: "PM2.5",
        data: forecast.pm25.map((d) => d.avg),
        borderColor: "#F56C6C",
        backgroundColor: "rgba(245, 108, 108, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "PM10",
        data: forecast.pm10.map((d) => d.avg),
        borderColor: "#FFAA33",
        backgroundColor: "rgba(255, 170, 51, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "UV Index",
        data: forecast.uvi.map((d) => d.avg),
        borderColor: "#FFDD57",
        backgroundColor: "rgba(255, 221, 87, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg w-full max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Air Quality Forecast (Next 7 Days)
      </h3>
      <div className="h-[500px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AirQualityChart;
