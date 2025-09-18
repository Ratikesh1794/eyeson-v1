import { useState, useEffect, useCallback } from 'react';
import reellistData from '../../data/dummydata/reellist.json';
import featuredData from '../../data/dummydata/featured.json';
import ThumbnailPopup from '../../components/ThumbnailPopup';

// Define the item type for better type safety
interface ReelItem {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  releaseDate: string;
  duration: string;
}

export default function Home() {
  const [activeItem, setActiveItem] = useState<ReelItem | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [thumbnailRect, setThumbnailRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null);
  
  // Featured content state
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredItems, setFeaturedItems] = useState<ReelItem[]>([]);
  
  // Prepare featured items by flattening all categories
  useEffect(() => {
    const allFeaturedItems = featuredData.categories.flatMap(category => 
      category.items.map(item => item as ReelItem)
    );
    setFeaturedItems(allFeaturedItems);
  }, []);
  
  // Auto-advance featured item
  useEffect(() => {
    if (featuredItems.length === 0) return;
    
    const interval = setInterval(() => {
      setFeaturedIndex(prevIndex => 
        prevIndex >= featuredItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change featured item every 5 seconds
    
    return () => clearInterval(interval);
  }, [featuredItems]);

  const handleMouseEnter = (item: ReelItem, event: React.MouseEvent) => {
    // Clear any existing timeout
    if (hoverTimeout !== null) {
      window.clearTimeout(hoverTimeout);
    }
    
    // Get the target element to capture its dimensions
    const target = event.currentTarget as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    
    // Set a small delay before showing the popup (like Netflix)
    const timeout = window.setTimeout(() => {
      setActiveItem(item);
      
      // Store both cursor position and thumbnail dimensions
      setPopupPosition({
        x: event.clientX,
        y: event.clientY
      });
      
      // Store the thumbnail element's position and dimensions
      setThumbnailRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }, 500); // 500ms delay
    
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = (event: React.MouseEvent) => {
    // Clear the timeout if the user moves away quickly
    if (hoverTimeout !== null) {
      window.clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    
    // Only close if we're not moving to the popup itself
    // Get related target (element being entered)
    const relatedTarget = event.relatedTarget as HTMLElement;
    
    // Check if the related target is the popup or within it
    if (relatedTarget && 
        (relatedTarget.classList.contains('bg-background-secondary') ||
         relatedTarget.closest('.bg-background-secondary'))) {
      return; // Don't close if moving to the popup
    }
    
    // Small delay before hiding to allow moving cursor to popup
    const closeTimeout = setTimeout(() => {
      setActiveItem(null);
      setPopupPosition(null);
      setThumbnailRect(null);
    }, 300);
    
    return () => clearTimeout(closeTimeout);
  };

  // Manual navigation for featured content
  const nextFeatured = useCallback(() => {
    setFeaturedIndex(prevIndex => 
      prevIndex >= featuredItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [featuredItems.length]);
  
  const prevFeatured = useCallback(() => {
    setFeaturedIndex(prevIndex => 
      prevIndex <= 0 ? featuredItems.length - 1 : prevIndex - 1
    );
  }, [featuredItems.length]);

  return (
    <div className="h-full w-full bg-background-primary text-text-primary min-h-[calc(100vh-12rem)]">
      {/* Featured Preview Section */}
      {featuredItems.length > 0 && (
        <div className="relative w-full h-[75vh] overflow-hidden group">
          {/* Featured Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{ 
              backgroundImage: `url(${featuredItems[featuredIndex]?.thumbnail})`,
              filter: 'blur(3px) brightness(0.3)',
              transform: 'scale(1.05)'
            }}
          />
          
          {/* Enhanced Content Overlay with more dramatic gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary from-10% via-background-primary/70 via-40% to-transparent" />
          
          <div className="container mx-auto h-full flex items-center relative z-10 px-8">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-12 w-full max-w-7xl mx-auto">
              {/* Featured Thumbnail with enhanced shadow and animation */}
              <div className="w-full md:w-2/5 aspect-[3/4] rounded-xl overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.9)] transform transition-all duration-700 group-hover:scale-[1.02]">
                <img 
                  src={featuredItems[featuredIndex]?.thumbnail} 
                  alt={featuredItems[featuredIndex]?.name}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                />
              </div>
              
              {/* Featured Info with enhanced typography and layout */}
              <div className="w-full md:w-3/5 space-y-6 mt-6 md:mt-0 px-4 md:px-0">
                {/* Subtle badge/tag above title */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600/20 backdrop-blur-sm border border-red-600/40 mb-4">
                  <span className="text-xs font-semibold text-red-400">FEATURED</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{featuredItems[featuredIndex]?.name}</h1>
                
                <div className="flex items-center text-sm text-gray-300 space-x-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {featuredItems[featuredIndex]?.releaseDate}
                  </span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {featuredItems[featuredIndex]?.duration}
                  </span>
                </div>
                
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  {featuredItems[featuredIndex]?.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-6">
                  <button className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg flex items-center space-x-2 transition transform hover:translate-y-[-2px] shadow-lg shadow-red-600/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Watch Now</span>
                  </button>
                  <button className="px-6 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition flex items-center space-x-2 border border-gray-700 shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Add to List</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Enhanced Navigation Arrows */}
            <div className="absolute left-6 right-6 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={prevFeatured}
                className="w-14 h-14 bg-black/30 backdrop-blur-md hover:bg-black/50 rounded-full flex items-center justify-center text-white transition transform hover:scale-110 pointer-events-auto border border-white/10"
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextFeatured}
                className="w-14 h-14 bg-black/30 backdrop-blur-md hover:bg-black/50 rounded-full flex items-center justify-center text-white transition transform hover:scale-110 pointer-events-auto border border-white/10"
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Enhanced Indicators */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3">
              {featuredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setFeaturedIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === featuredIndex ? 'w-10 bg-red-600' : 'w-3 bg-gray-400/30 hover:bg-gray-400/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="p-6 space-y-8">
        {reellistData.categories.map((category) => (
          <div key={category.name} className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">{category.name}</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-48 h-72 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
                  onMouseEnter={(e) => handleMouseEnter(item as ReelItem, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Render the popup if there's an active item */}
      {activeItem && popupPosition && (
        <ThumbnailPopup
          item={activeItem}
          position={popupPosition}
          thumbnailRect={thumbnailRect}
          onClose={() => {
            setActiveItem(null);
            setPopupPosition(null);
            setThumbnailRect(null);
          }}
        />
      )}
    </div>
  );
}
