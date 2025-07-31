// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Precautions from "./pages/Precautions";
import ImprovementMeasures from "./pages/ImprovementMeasures";
import AirQualityChart from "./pages/AirQualityChart";
import HealthAdvisor from "./pages/HealthAdvisor";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="precautions" element={<Precautions />} />
        <Route path="improvement" element={<ImprovementMeasures />} />
        <Route path="chart" element={<AirQualityChart />} />
        <Route path="health-advisor" element={<HealthAdvisor />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
