import { useRef, useEffect, useState } from 'react';

interface ThumbnailPopupProps {
  item: {
    name: string;
    description: string;
    thumbnail: string;
    videoUrl: string;
    releaseDate: string;
    duration: string;
  };
  position: {
    x: number;
    y: number;
  } | null;
  thumbnailRect: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  onClose: () => void;
}

export default function ThumbnailPopup({ item, position, thumbnailRect, onClose }: ThumbnailPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Handle mouse events for popup
  const handleMouseLeave = () => {
    // Close popup when mouse leaves
    setShowVideo(false);
    onClose();
  };

  // Load video after a brief delay to ensure smooth popup opening
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events and position recalculation
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let isScrolling = false;

    const handleScroll = () => {
      // Close popup immediately when scrolling starts
      if (!isScrolling) {
        isScrolling = true;
        onClose();
        setShowVideo(false);
      }

      // Clear the existing timeout
      clearTimeout(scrollTimeout);

      // Set a new timeout to run after scrolling ends
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        // Update thumbnailRect if it exists (means we're hovering over a thumbnail)
        if (thumbnailRect) {
          const element = document.elementFromPoint(
            thumbnailRect.x + thumbnailRect.width / 2,
            thumbnailRect.y + thumbnailRect.height / 2
          );
          // If we're still hovering over the thumbnail after scroll
          if (element) {
            // Trigger position recalculation by forcing a position update
            if (popupRef.current && position) {
              adjustPosition();
            }
          }
        }
      }, 150); // Wait for scroll to finish
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [onClose, thumbnailRect, position]);

  // Stop event bubbling to prevent blinking/flickering
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  // Adjust position when popup renders or window resizes
  useEffect(() => {
    // Run when popup appears or position changes
    if (popupRef.current && position) {
      adjustPosition();
    }
    
    // Handle window resize independently
    const handleResize = () => {
      if (popupRef.current && position) {
        const popup = popupRef.current;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const rect = popup.getBoundingClientRect();
        
        // Only adjust if we're at risk of going outside viewport
        if (rect.right > viewportWidth || rect.bottom > viewportHeight || 
            rect.left < 0 || rect.top < 0) {
          adjustPosition();
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [position]);
  
  // Function to adjust position based on viewport boundaries and header
  const adjustPosition = () => {
    if (!popupRef.current || !position) return;
    
    const popup = popupRef.current;
    const rect = popup.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get header height - find the header element and get its height
    // Default to 72px (18rem) if header can't be found
    const headerElement = document.querySelector('header');
    const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 72;
    const safeAreaTop = headerHeight + 10; // Add padding to avoid touching the header
    
    // If we have thumbnail info, position the popup directly at its final position
    // without animating from the thumbnail dimensions
    if (thumbnailRect) {
      const finalWidth = 300; // Reduced width for smaller popup
      
      // Center the popup on the original thumbnail
      const newX = thumbnailRect.x - ((finalWidth - thumbnailRect.width) / 2);
      const newY = thumbnailRect.y - 20; // Position slightly above thumbnail
      
      // Adjust if it would go outside viewport or overlap with header
      const adjustedX = Math.max(10, Math.min(viewportWidth - finalWidth - 10, newX));
      
      // Ensure it doesn't overlap with header
      let adjustedY = Math.max(safeAreaTop, newY);
      
      // If positioning below header would push it too far from the thumbnail,
      // try positioning it below the thumbnail instead
      if (adjustedY > thumbnailRect.y + thumbnailRect.height && adjustedY - newY > 50) {
        adjustedY = thumbnailRect.y + thumbnailRect.height + 10;
      }
      
      // Apply styles immediately without animation
      popup.style.transition = 'none'; // Disable transition between thumbnails
      popup.style.left = `${adjustedX}px`;
      popup.style.top = `${adjustedY}px`;
      popup.style.width = `${finalWidth}px`;
      popup.style.height = 'auto';
      popup.style.minHeight = '400px'; // Set height for 3:4 ratio (300:400)
      
      // Ensure popup doesn't extend beyond bottom of viewport
      const maxHeight = viewportHeight - adjustedY - 20;
      popup.style.maxHeight = `${maxHeight}px`;
      
      // If max height is too small, try repositioning above thumbnail
      if (maxHeight < 400 && thumbnailRect.y > 450) {
        const topPosition = Math.max(safeAreaTop, thumbnailRect.y - rect.height - 10);
        popup.style.top = `${topPosition}px`;
        popup.style.maxHeight = `${thumbnailRect.y - topPosition - 10}px`;
      }
      
      return;
    }
    
    // Otherwise, position at cursor with viewport boundary detection
    // Calculate new position to keep popup in viewport
    let newX = position.x;
    let newY = position.y;
    
    // Default offset to prevent popup from appearing directly under cursor
    const offsetY = 5; // Small offset from cursor
    
    // Apply initial offset - popup appears right at cursor with small offset
    newY += offsetY;
    
    // Ensure popup doesn't appear above the header
    newY = Math.max(safeAreaTop, newY);
    
    // Adjust horizontal position if needed to keep in viewport
    if (position.x + rect.width > viewportWidth) {
      newX = position.x - rect.width; // Position to the left of cursor if not enough space on right
      
      // If still doesn't fit, position at right edge with padding
      if (newX < 0) {
        newX = Math.max(10, viewportWidth - rect.width - 10);
      }
    }
    
    // Adjust vertical position if needed to keep in viewport
    if (position.y + rect.height + offsetY > viewportHeight) {
      newY = position.y - rect.height - offsetY; // Position above cursor if not enough space below
      
      // Ensure it doesn't go above header
      newY = Math.max(safeAreaTop, newY);
      
      // If still doesn't fit, position at bottom edge with padding
      if (newY < safeAreaTop) {
        newY = Math.max(safeAreaTop, viewportHeight - rect.height - 10);
      }
    }
    
    // Apply the new position
    popup.style.left = `${newX}px`;
    popup.style.top = `${newY}px`;
  };

  // Convert YouTube URL to embed URL with lazy loading
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/shorts/')) {
      const videoId = url.split('/shorts/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loading=lazy`;
    } else if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loading=lazy`;
    }
    return url;
  };

  if (!position) return null;

  // Style for popup initial positioning - no animation between positions
  const popupStyle = thumbnailRect
    ? {
        position: 'fixed' as const,
        left: `${thumbnailRect.x}px`,
        top: `${thumbnailRect.y}px`,
        width: '300px', // Reduced width for smaller popup
        height: 'auto',
        transform: 'none',
      }
    : {
        left: `${position?.x || 0}px`,
        top: `${position?.y || 0}px`,
        transform: 'translate(0, 0)',
      };

  return (
    <div
      ref={popupRef}
      className="fixed z-50 bg-[#1a1a1a] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] border border-[#2a2a2a] overflow-hidden w-[300px]"
      style={{
        ...popupStyle,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
      onMouseEnter={stopPropagation}
      onMouseLeave={handleMouseLeave}
      onMouseOver={stopPropagation}
    >
      <div className="relative h-full flex flex-col">
        {/* Video Preview - Vertical aspect ratio for reels/shorts */}
        <div className="w-full aspect-[3/4] rounded-xl overflow-hidden">
          {/* Show thumbnail image immediately */}
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${item.thumbnail})`,
              filter: showVideo ? 'none' : 'brightness(0.8)',
              transition: 'filter 0.2s ease'
            }}
          />
          
          {/* Video player overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 pointer-events-none"></div>
          
          {/* Load video after delay */}
          {showVideo && (
            <iframe
              ref={videoRef}
              src={getEmbedUrl(item.videoUrl)}
              className="w-full h-full absolute top-0 left-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.name}
              loading="lazy"
              style={{ willChange: 'transform' }}
            ></iframe>
          )}
          
          {/* Play indicator */}
          {!showVideo && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                <div className="w-0 h-0 border-y-6 border-y-transparent border-l-10 border-l-white ml-1"></div>
              </div>
            </div>
          )}
            
          {/* Content overlay on bottom 35% */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm flex flex-col justify-between p-3 pb-4" style={{ height: '40%' }}>
            <div>
              <h3 className="font-bold text-base text-white line-clamp-1 overflow-hidden text-ellipsis">{item.name}</h3>
              
              <div className="flex items-center gap-1 text-xs text-[#b3b3b3] mt-1 overflow-hidden">
                <span className="flex-shrink-0">{item.releaseDate}</span>
                <span className="flex-shrink-0 mx-0.5">•</span>
                <span className="flex-shrink-0">{item.duration}</span>
              </div>
              
              <p className="mt-2 text-[#e1e1e1] line-clamp-3 overflow-hidden break-words text-xs">{item.description}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2 items-center mt-auto">
              <button className="flex-1 flex items-center justify-center gap-1 bg-white text-black font-medium py-1 px-2 rounded-full text-xs hover:bg-gray-200 transition-colors">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
                Play
              </button>
              <button className="flex items-center justify-center w-6 h-6 rounded-full border border-[#444] text-white hover:bg-[#333] transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}