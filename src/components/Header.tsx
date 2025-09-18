import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Close profile menu if clicking outside profile container
      if (!target.closest(".profile-container")) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Close search if clicking outside search container
      if (!target.closest(".search-container") && showSearch) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  // Sidebar: close on ESC and click outside; lock body scroll when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    // lock scroll
    if (isSidebarOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("mousedown", onClick);
      };
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [isSidebarOpen]);

  const navigationItems = [
    "Home",
    "TV Shows",
    "Movies",
    "New & Popular",
    "My List",
    "Browse by Languages",
  ];

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  // Handle search submissions
  const handleSearch = (query: string) => {
    // Here you would typically call your search API
    console.log("Searching for:", query);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-xl"
          : "bg-gradient-to-b from-black/90 via-black/60 to-transparent"
      }`}
    >
      {/* Main Header Container */}
      <div className="mx-auto">
        <div className="flex items-center justify-between h-18 px-4 sm:px-8 lg:!px-12">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center gap-4 lg:gap-12">
            {/* Hamburger - mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/5 transition"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-yellow-400 text-3xl font-bold tracking-tight hover:text-yellow-300 transition-colors duration-200 cursor-pointer">
                ShoTT
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-white text-sm font-medium hover:text-yellow-400 transition-all duration-200 relative group px-3 py-2 rounded-md hover:bg-white/5"
                >
                  {item}
                  <span className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-yellow-400 transition-all duration-200 group-hover:w-3/4 rounded-full"></span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Section - Search, Actions, Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex items-center search-container">
              <div
                className={`
                transition-all duration-500 ease-in-out overflow-hidden
                ${showSearch ? "w-[250px] opacity-100" : "w-0 opacity-0"}
              `}
              >
                <SearchBar
                  placeholder="Search..."
                  onSearch={handleSearch}
                  autoFocus={true}
                  showResultsOnEmpty={false}
                />
              </div>

              {/* Search Toggle Button - Only show when search is collapsed */}
              {!showSearch && (
                <button
                  onClick={handleSearchToggle}
                  className="flex-shrink-0 text-white hover:text-yellow-400 transition-all duration-300 ease-in-out p-2 rounded-md hover:bg-white/5"
                  aria-label="Open search"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Secondary Actions Container */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Kids */}
              <a
                href="#"
                className="text-white text-sm font-medium hover:text-yellow-400 transition-colors py-2 px-3 rounded-md hover:bg-white/5"
              >
                Kids
              </a>

              {/* Notifications */}
              <button
                className="text-white hover:text-yellow-400 transition-all duration-200 p-2 relative rounded-md hover:bg-white/5"
                aria-label="Notifications"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5-5V8a7 7 0 10-14 0v4l-5 5h5m9 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {/* Notification badge */}
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative profile-container">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white hover:text-yellow-400 transition-all duration-200 p-1 rounded-md hover:bg-white/5"
                aria-label="Profile menu"
              >
                <div className="w-9 h-9 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-white/10">
                  <span className="text-black text-base font-bold">U</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-black/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl py-2 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/20">
                    <div className="text-white font-medium">John Doe</div>
                    <div className="text-gray-400 text-sm">
                      john@example.com
                    </div>
                  </div>

                  <a
                    href="#"
                    className="block px-4 py-3 text-white text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors"
                  >
                    Manage Profiles
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-white text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors"
                  >
                    Account Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-3 text-white text-sm hover:bg-white/10 hover:text-yellow-400 transition-colors"
                  >
                    Help Center
                  </a>
                  <hr className="border-white/20 my-2" />
                  <a
                    href="#"
                    className="block px-4 py-3 text-white text-sm hover:bg-white/10 hover:text-red-400 transition-colors"
                  >
                    Sign out of ShoTT
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Drawer and Overlay */}
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Drawer */}
      <aside
        ref={sidebarRef}
        className={`lg:hidden fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-gradient-to-b from-black to-black/95 border-r border-white/10 shadow-2xl transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md flex items-center justify-center shadow">
              <span className="text-black font-bold">S</span>
            </div>
            <span className="text-yellow-400 text-xl font-semibold">ShoTT</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-md text-white hover:text-yellow-400 hover:bg-white/5 transition"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
          {/* Quick Search */}
          <div className="pt-2">
            <SearchBar
              placeholder="Search shows, movies, actors..."
              onSearch={handleSearch}
              autoFocus={false}
            />
          </div>

          {/* Nav Items */}
          <nav className="mt-2">
            <ul className="space-y-1">
              {navigationItems.map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-white hover:text-yellow-400 hover:bg-white/5 transition"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {/* simple dot icon */}
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    <span className="text-sm font-medium">{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <hr className="border-white/10" />

          {/* Secondary */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#"
              className="px-3 py-2 rounded-lg text-white/90 hover:text-yellow-400 hover:bg-white/5 transition text-sm"
            >
              Kids
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-lg text-white/90 hover:text-yellow-400 hover:bg-white/5 transition text-sm"
            >
              New & Popular
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-lg text-white/90 hover:text-yellow-400 hover:bg-white/5 transition text-sm"
            >
              My List
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-lg text-white/90 hover:text-yellow-400 hover:bg-white/5 transition text-sm"
            >
              Languages
            </a>
          </div>

          <div className="mt-2 space-y-1">
            <a
              href="#"
              className="block px-3 py-3 rounded-lg text-white hover:text-yellow-400 hover:bg-white/5 transition text-sm"
            >
              Account Settings
            </a>
            <a
              href="#"
              className="block px-3 py-3 rounded-lg text-white hover:text-yellow-400 hover:bg-white/5 transition text-sm"
            >
              Help Center
            </a>
            <a
              href="#"
              className="block px-3 py-3 rounded-lg text-white hover:text-red-400 hover:bg-white/5 transition text-sm"
            >
              Sign out
            </a>
          </div>

          <div className="pt-1 text-[10px] text-white/40">v1 • © ShoTT</div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
