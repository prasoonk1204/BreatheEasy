// src/components/Layout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

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

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "filter blur-sm" : ""}
        `}
      >
        {/* Main content area */}
        <main className={`p-4 pt-16 lg:pt-4 ${collapsed ? "lg:ml-20" : "lg:ml-64"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;