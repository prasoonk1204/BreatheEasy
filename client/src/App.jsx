// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Precautions from "./pages/Precautions";
import ImprovementMeasures from "./pages/ImprovementMeasures";
import AirQualityChart from "./pages/AirQualityChart";
import ExploreAQI from "./pages/ExploreAQI";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

// Private Route wrapper
const PrivateRoute = ({ element, token }) => {
  return token ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Keep token in sync with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              token={token}
              element={<Layout />}
            />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="precautions" element={<Precautions />} />
          <Route path="improvement" element={<ImprovementMeasures />} />
          <Route path="chart" element={<AirQualityChart />} />
          <Route path="explore-aqi" element={<ExploreAQI />} />
           <Route path="profile" element={<Profile />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
