// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import LanguageToggle from "./LanguageToggle";

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false); // Sidebar collapse state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu state

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Navbar for small screens */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Sidebar for large screens */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main content area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "filter blur-sm" : ""}`}
      >
        <main className={`p-4 pt-16 lg:pt-4 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          {/* Page content will render here */}
          <Outlet />
          
          {/* Other components */}
          <LanguageToggle />
          <ScrollToTop />
        </main>
      </div>
    </div>
  );
};

export default Layout;
