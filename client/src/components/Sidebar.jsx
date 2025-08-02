// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Globe2,
  Sun, Moon, PanelLeft,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";


const links = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={30} /> },
  { name: "Precautions", path: "/dashboard/precautions", icon: <ShieldCheck size={30} /> },
  { name: "Improvement", path: "/dashboard/improvement", icon: <TrendingUp size={30} /> },
  { name: "Air Quality Forecast", path: "/dashboard/chart", icon: <BarChart3 size={30} /> },
  { name: "Explore AQI", path: "/dashboard/explore-aqi", icon: <Globe2 size={30} /> },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`
        hidden lg:flex flex-col justify-between fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-md z-40
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      <div className="flex-1">
        {/* Top section: Logo, App Name, and Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-2">
            
            {!collapsed && (
              <>
                <img src="favicon.png" alt="Logo" className="w-10 h-10" />
                <h1 className="text-xl font-bold transition-opacity duration-300 ease-in-out text-emerald-800 dark:text-green-400">
                  BreatheEasy
                </h1>
              </>
                
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <PanelLeft
              size={24}
              className={`${collapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                relative flex items-center px-4 py-3 rounded-lg text-sm font-medium
                group transition-all duration-300 ease-in-out
                ${
                  location.pathname === link.path
                    ? "bg-emerald-600 text-white"
                    : "text-gray-700 hover:bg-emerald-100 dark:text-gray-200 dark:hover:bg-green-700"
                }
                ${collapsed ? "justify-center" : "gap-4"}
              `}
            >
              {link.icon}
              <span
                className={`
                  transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden
                  ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                `}
              >
                {link.name}
              </span>
              {/* Modern tooltip for collapsed state */}
              {collapsed && (
                <span
                  className="absolute left-full ml-4 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
                >
                  {link.name}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer section: User Info and Theme Toggle */}
      <div className="border-t p-4 dark:border-gray-700">
        <div
          className={`flex items-center gap-3 transition-all mb-4 ${
            collapsed ? "flex-col gap-1" : ""
          }`}
        >
          <img
            src="logo.svg"
            className="w-10 h-10 rounded-full"
            alt="User"
          />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">User Name</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className={`flex items-center w-full p-3 rounded-lg transition-colors
            ${
              theme === "dark"
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-100 text-blue-600 hover:bg-gray-200"
            }
            ${collapsed ? "justify-center" : "gap-3"}
          `}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && (
            <span className="font-medium text-sm">Toggle Theme</span>
          )}
        </button>
      </div>
    </aside>
  );
}