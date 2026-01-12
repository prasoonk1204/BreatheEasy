import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="font-bold text-gray-800 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <span className="font-semibold">{entry.value.toFixed(1)}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AreaChartComponent = ({ data, dataKeys }) => {
  return (
    <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(200, 200, 200, 0.2)" />
      <XAxis dataKey="day" stroke="#666" style={{ fontSize: '14px' }} />
      <YAxis stroke="#666" style={{ fontSize: '14px' }} />
      <Tooltip content={<CustomTooltip />} />
      <Legend wrapperStyle={{ paddingTop: '20px' }} />
      {dataKeys.map(({ key, name, color }) => (
        <Area
          key={key}
          type="monotone"
          dataKey={key}
          stroke={color}
          fill={color}
          fillOpacity={0.3}
          strokeWidth={2}
          name={name}
        />
      ))}
    </AreaChart>
  );
};

export default AreaChartComponent;