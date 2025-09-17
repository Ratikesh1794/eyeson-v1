import React from "react";
import { Link } from "@tanstack/react-router";

const Header: React.FC = () => {
  return (
    <header className="bg-background-primary text-text-primary p-4 border-b border-background-tertiary">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Eyes0n</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="text-text-primary hover:text-button-tertiary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-text-primary hover:text-button-tertiary transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-text-primary hover:text-button-tertiary transition-colors"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
