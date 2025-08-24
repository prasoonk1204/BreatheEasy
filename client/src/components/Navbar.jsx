import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon, Menu, X } from "lucide-react";

const links = [
  { name: "Profile", path: "/dashboard/profile" },  
  { name: "Dashboard", path: "/dashboard" },
  { name: "Explore AQI", path: "/dashboard/explore-aqi" },
  { name: "Air Quality Forecast", path: "/dashboard/chart" },
  { name: "Precautions", path: "/dashboard/precautions" },
  { name: "Improvement", path: "/dashboard/improvement" },
];

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, isAuthenticated, handleLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinkClass = (path) => {
    let baseClass = `font-medium transition-colors text-gray-800 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400`;
    if (location.pathname === path) {
      baseClass += " text-emerald-600 dark:text-emerald-400";
    }
    // Strong highlight for Profile (desktop)
    if (path === "/dashboard/profile") {
      baseClass += " underline decoration-emerald-500 decoration-2 font-semibold text-lg hover:text-emerald-700";
    }
    return baseClass;
  };

  const mobileNavLinkClass = (path) => {
    let baseClass = `block w-full text-left px-4 py-3 rounded-lg transition-all font-medium text-lg`;
    if (location.pathname === path) {
      baseClass += " bg-emerald-600 text-white dark:bg-emerald-600";
    } else {
      baseClass += " text-gray-800 hover:bg-emerald-100 dark:text-gray-100 dark:hover:bg-emerald-700/60";
    }
    // Strong highlight for Profile (mobile)
    if (path === "/dashboard/profile") {
      baseClass += " border-l-4 border-emerald-500 font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-700";
    }
    return baseClass;
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex sticky top-0 z-[10000] items-center justify-between px-8 py-4 shadow-md transition-all dark:bg-gray-900 dark:text-white bg-white text-black">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold transition-colors dark:text-green-400 text-emerald-600">
            BreatheEasy
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {links.map(link => (
            <Link key={link.path} to={link.path} className={navLinkClass(link.path)}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="transition-all duration-300 cursor-pointer flex items-center justify-center p-2 rounded-full border bg-white border-green-400 text-green-800 hover:bg-green-100 dark:bg-green-800/30 dark:border-green-600 dark:text-white dark:hover:bg-green-700/60"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden sticky top-0 z-[10000] flex items-center justify-between px-6 py-4 shadow-md transition-all dark:bg-gray-900 dark:text-white bg-white text-black">
        <div className="flex items-center gap-2">
          <img src="/favicon.png" alt="Logo" className="w-8 h-8" />
          <Link to="/" className="text-2xl font-bold transition-colors dark:text-green-400 text-emerald-600">
            BreatheEasy
          </Link>
        </div>

        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="transition-all duration-300 cursor-pointer flex items-center justify-center px-3 py-2 rounded-full border bg-white border-green-400 text-green-800 hover:bg-green-100 dark:bg-green-800/30 dark:border-green-600 dark:text-white dark:hover:bg-green-700/60 mr-4"
            aria-label="Toggle theme"
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

        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-800 shadow-xl z-[10000] transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6 flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-800 dark:text-white focus:outline-none"
                  aria-label="Close mobile menu"
                >
                  <X size={28} />
                </button>
              </div>
              <div className="mt-8 flex flex-col space-y-3">
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

            {isAuthenticated && (
              <div className="border-t p-4 dark:border-gray-700">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 text-sm font-semibold rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
