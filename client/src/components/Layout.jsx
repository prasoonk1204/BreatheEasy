// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop"; 

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar for small screens */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Sidebar for large screens */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "filter blur-sm" : ""}
        `}
      >
        {/* Main content area */}
        <main className={`p-4 pt-16 lg:pt-4 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          <Outlet />
          <ScrollToTop />
        </main>
      </div>
    </div>
  );
};

export default Layout;