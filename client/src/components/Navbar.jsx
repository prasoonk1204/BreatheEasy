// components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-emerald-500 text-white"
        : "hover:bg-emerald-100"
    }`;

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-emerald-600">BreatheEasy</h1>
      <div className="flex items-center space-x-3 flex-wrap">
        <Link to="/" className={navLinkClass("/")}>
          Dashboard
        </Link>
        <Link to="/precautions" className={navLinkClass("/precautions")}>
          Precautions
        </Link>
        <Link to="/improvement" className={navLinkClass("/improvement")}>
          Improvement
        </Link>
        <Link to="/chart" className={navLinkClass("/chart")}>
          Air Quality Forecast
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
