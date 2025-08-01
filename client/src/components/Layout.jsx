// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // swap Navbar for Sidebar

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white transition-colors duration-300">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <main className="flex-1 p-4 lg:ml-64 transition-all">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
