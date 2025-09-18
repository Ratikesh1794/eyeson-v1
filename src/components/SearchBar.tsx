import React, { useEffect, useRef, useState } from "react";

type SearchBarProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  autoFocus?: boolean;
  showResultsOnEmpty?: boolean;
  className?: string;
  defaultValue?: string;
  debounceMs?: number;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  autoFocus = false,
  showResultsOnEmpty = false,
  defaultValue = "",
  debounceMs = 0,
}) => {
  const [value, setValue] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Debounced search for live search experiences
  useEffect(() => {
    if (!debounceMs) return;
    const handler = setTimeout(() => {
      if (value.trim() || showResultsOnEmpty) {
        onSearch(value.trim());
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [value, debounceMs, onSearch, showResultsOnEmpty]);

  // Standard styling for a professional look
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (q || showResultsOnEmpty) {
      onSearch(q);
    }
  };

  return (
    <div className="flex w-[250px] h-[32px]">
      {/* Styled container for search bar */}
      <div className="flex w-full rounded-full transition-all bg-white/10 backdrop-blur-md border border-yellow-400">
        {/* Input field - purely functional */}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e);
            }
          }}
          type="search"
          placeholder={placeholder}
          className="w-full h-full bg-transparent outline-none focus:outline-none focus:ring-0 border-none px-4 rounded-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
