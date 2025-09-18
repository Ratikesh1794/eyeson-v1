import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-primary text-text-primary py-10 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-2">ShoTT</h2>
            <p className="text-text-secondary text-sm mb-4">Watch shorts like never before</p>
            <div className="flex space-x-4 mt-2">
              <FaFacebookF className="text-text-secondary hover:text-white cursor-pointer" />
              <FaTwitter className="text-text-secondary hover:text-white cursor-pointer" />
              <FaInstagram className="text-text-secondary hover:text-white cursor-pointer" />
              <FaYoutube className="text-text-secondary hover:text-white cursor-pointer" />
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="text-text-secondary text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">New Releases</li>
              <li className="hover:text-white cursor-pointer">Top Shorts</li>
              <li className="hover:text-white cursor-pointer">Categories</li>
              <li className="hover:text-white cursor-pointer">Creators</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Help</h3>
            <ul className="text-text-secondary text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">FAQ</li>
              <li className="hover:text-white cursor-pointer">Support</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
              <li className="hover:text-white cursor-pointer">Report an Issue</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="text-text-secondary text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Cookie Policy</li>
              <li className="hover:text-white cursor-pointer">Content Guidelines</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-5 border-t border-background-tertiary/20">
          <p className="text-text-secondary text-xs text-center">
            &copy; 2025 ShoTT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
