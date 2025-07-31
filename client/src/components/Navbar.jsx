// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon, Menu, X } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg transition-all font-medium whitespace-nowrap
    ${location.pathname === path
      ? "dark:bg-purple-600 dark:text-white bg-emerald-500 text-white"
      : "dark:hover:bg-purple-700 dark:text-gray-100 hover:bg-emerald-100 text-gray-800"
    }`;

  const mobileNavLinkClass = (path) =>
    `block w-full text-left px-4 py-3 rounded-lg transition-all font-medium text-lg
    ${location.pathname === path
      ? "bg-emerald-600 text-white dark:bg-purple-600"
      : "text-gray-800 hover:bg-emerald-100 dark:text-gray-100 dark:hover:bg-purple-700"
    }`;

  return (
    <nav
      className={`sticky top-0 z-[10000] flex items-center justify-between px-6 py-4 shadow-md transition-all dark:bg-gray-900 dark:text-white bg-white text-black`}
    >
      <h1
        className={`text-2xl font-bold transition-colors dark:text-purple-400 text-emerald-600`}
      >
        BreatheEasy
      </h1>

      {/* Desktop Navigation Links - Now visible only on 'lg' screens and above */}
      <div className="hidden lg:flex items-center space-x-3">
        <Link to="/" className={navLinkClass("/")}>Dashboard</Link>
        <Link to="/precautions" className={navLinkClass("/precautions")}>Precautions</Link>
        <Link to="/improvement" className={navLinkClass("/improvement")}>Improvement</Link>
        <Link to="/chart" className={navLinkClass("/chart")}>Air Quality Forecast</Link>
        <Link to="/explore-aqi" className={navLinkClass("/explore-aqi")}>Explore AQI</Link>
        
        {/* Theme Toggle for Desktop */}
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

      {/* Mobile Menu Button (Hamburger Icon) - Now visible up to 'lg' screens */}
      <div className="lg:hidden flex items-center">
        {/* Theme Toggle for Mobile */}
        <button
          onClick={toggleTheme}
          className="transition-all duration-300 cursor-pointer flex items-center justify-center px-3 py-2 rounded-full border bg-white border-green-400 text-green-800 hover:bg-green-100 dark:bg-purple-800 dark:border-purple-600 dark:text-white dark:hover:bg-purple-700 mr-2"
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

      {/* Mobile Menu Overlay - Now visible up to 'lg' screens */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg py-4 transition-transform duration-300 ease-in-out origin-top"
          style={{ transform: isMobileMenuOpen ? 'scaleY(1)' : 'scaleY(0)' }}
        >
          <div className="flex flex-col items-center space-y-3 px-6">
            <Link to="/" className={mobileNavLinkClass("/")} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/precautions" className={mobileNavLinkClass("/precautions")} onClick={() => setIsMobileMenuOpen(false)}>Precautions</Link>
            <Link to="/improvement" className={mobileNavLinkClass("/improvement")} onClick={() => setIsMobileMenuOpen(false)}>Improvement</Link>
            <Link to="/chart" className={mobileNavLinkClass("/chart")} onClick={() => setIsMobileMenuOpen(false)}>Air Quality Forecast</Link>
            <Link to="/explore-aqi" className={mobileNavLinkClass("/explore-aqi")} onClick={() => setIsMobileMenuOpen(false)}>Explore AQI</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;