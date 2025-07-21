// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      <Navbar />
      <main className="p-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
