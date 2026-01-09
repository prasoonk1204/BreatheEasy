import { Sparkles } from "lucide-react";

export const Header = ({ aqi, level }) => (
  <div className="p-6 rounded-3xl bg-emerald-50">
    <h1 className="text-3xl font-bold flex gap-2">
      <Sparkles /> Improvement Measures
    </h1>
    <p className="mt-2">Current AQI: <b>{aqi}</b> ({level})</p>
  </div>
);
