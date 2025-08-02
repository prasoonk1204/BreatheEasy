// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Precautions from "./pages/Precautions";
import ImprovementMeasures from "./pages/ImprovementMeasures";
import AirQualityChart from "./pages/AirQualityChart";
import ExploreAQI from "./pages/ExploreAQI";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="precautions" element={<Precautions />} />
        <Route path="improvement" element={<ImprovementMeasures />} />
        <Route path="chart" element={<AirQualityChart />} />
        <Route path="explore-aqi" element={<ExploreAQI />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
