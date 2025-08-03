// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop"; 


const Layout = () => {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="p-4 max-w-5xl mx-auto">
        <Outlet />
        <ScrollToTop />
      </main>
    </div>
  );
};

export default Layout;
