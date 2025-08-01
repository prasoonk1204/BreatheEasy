// src/components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar for small screens */}
      <Navbar />

      {/* Sidebar for large screens */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          lg:ml-${collapsed ? "20" : "64"}
        `}
      >
        {/* Main content area */}
        <main className="p-4 pt-16 lg:pt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;