// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Precautions", path: "/precautions" },
  { name: "Improvement", path: "/improvement" },
  { name: "Air Quality Forecast", path: "/chart" },
  { name: "Explore AQI", path: "/explore-aqi" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg transition-all font-medium whitespace-nowrap
    ${location.pathname === path
      ? "dark:bg-green-600 dark:text-white bg-emerald-500 text-white"
      : "dark:hover:bg-green-700 dark:text-gray-100 hover:bg-emerald-100 text-gray-800"
    }`;

  const mobileNavLinkClass = (path) =>
    `block w-full text-left px-4 py-3 rounded-lg transition-all font-medium text-lg
    ${location.pathname === path
      ? "bg-emerald-600 text-white dark:bg-green-600"
      : "text-gray-800 hover:bg-emerald-100 dark:text-gray-100 dark:hover:bg-green-700"
    }`;

  return (
    <nav
      className={`lg:hidden sticky top-0 z-[10000] flex items-center justify-between px-6 py-4 shadow-md transition-all dark:bg-gray-900 dark:text-white bg-white text-black`}
    >
      <div className="flex items-center gap-2">
        <img src="favicon.png" alt="Logo" className="w-8 h-8" />
        <h1
          className={`text-2xl font-bold transition-colors dark:text-green-400 text-emerald-600`}
        >
          BreatheEasy
        </h1>
      </div>

      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="transition-all duration-300 cursor-pointer flex items-center justify-center px-3 py-2 rounded-full border bg-white border-green-400 text-green-800 hover:bg-green-100 dark:bg-green-800 dark:border-green-600 dark:text-white dark:hover:bg-green-700 mr-2"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-blue-600" />
          )}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-800 dark:text-white focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-4 transition-transform duration-300 ease-in-out origin-top"
        >
          <div className="flex flex-col items-center space-y-3 px-6">
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={mobileNavLinkClass(link.path)}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;