// components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg transition-all font-medium
    ${location.pathname === path
      ? "dark:bg-purple-600 dark:text-white bg-emerald-500 text-white"
      : "dark:hover:bg-purple-700 dark:text-gray-100 hover:bg-emerald-100 text-gray-800"
    }`;

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-md transition-all dark:bg-gray-900 dark:text-white bg-white text-black`}
    >
      <h1
        className={`text-2xl font-bold transition-colors dark:text-purple-400 text-emerald-600`}
      >
        BreatheEasy
      </h1>

      <div className="flex items-center space-x-3 flex-wrap">
        <Link to="/" className={navLinkClass("/")}>Dashboard</Link>
        <Link to="/precautions" className={navLinkClass("/precautions")}>Precautions</Link>
        <Link to="/improvement" className={navLinkClass("/improvement")}>Improvement</Link>
        <Link to="/chart" className={navLinkClass("/chart")}>Air Quality Forecast</Link>

        <button
          onClick={toggleTheme}
          className="transition-all duration-300 cursor-pointer flex items-center justify-center px-3 py-2 rounded-full border bg-white border-green-400 text-green-800 hover:bg-green-100 dark:bg-purple-800 dark:border-purple-600 dark:text-white dark:hover:bg-purple-700"

        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-600" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
