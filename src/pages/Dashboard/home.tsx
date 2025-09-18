import { useState } from 'react';
import reellistData from '../../data/dummydata/reellist.json';
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

  return (
    <div className="h-full w-full bg-background-primary text-text-primary min-h-[calc(100vh-12rem)]">
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
