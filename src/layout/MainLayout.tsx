import React from "react";
import { Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Main Layout component
const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-secondary">
      <Header />
      <main className="flex-grow p-4">
        {/* Page Area - will be populated by the router outlet */}
        <div className="bg-background-tertiary p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
