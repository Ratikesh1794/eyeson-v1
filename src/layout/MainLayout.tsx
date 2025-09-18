import React from "react";
import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Main Layout component
const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-background-secondary">
      <Header />
      <div className="flex-grow p-4 pt-20 md:pt-2">
        {/* Page Area - will be populated by the router outlet */}
        <div className="bg-background-tertiary p-4 h-full w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
