import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../assets/search-icon.png";

type FeatureSearchProps = {
  onSearch?: (query: string) => void;
};

let activeController: AbortController | null = null;

async function fetchPlaces(query: string): Promise<string[]> {
  if (activeController) activeController.abort();

  activeController = new AbortController();
  const { signal } = activeController;

  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`,
      { signal }
    );
    const data = await res.json();
    return data.features.map((f: any) => f.properties.name).filter(Boolean);
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.log("Previous fetch aborted");
    } else {
      console.error("Fetch error:", err);
    }
    return [];
  }
}

function createCancelableDebounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: T) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };

  debounced.cancel = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
  };

  return debounced;
}

const FeatureSearch: React.FC<FeatureSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const debouncedSearch = useRef(
    createCancelableDebounce(async (q: string) => {
      if (!q) return setSuggestions([]);
      const res = await fetchPlaces(q);
      setSuggestions(res);
    }, 300)
  ).current;

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (s: string) => {
    setShowSuggestions(false);
    debouncedSearch.cancel(); // cancel scheduled fetch
    activeController?.abort(); // cancel any ongoing fetch
    setQuery(s);
    onSearch?.(s);
  };

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter your Destination"
          className="relative w-full py-4 pl-6 pr-16 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-md hover:shadow-lg transition"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-primary text-white rounded-full flex items-center justify-center"
        >
          <img src={SearchIcon} alt="Search" className="h-5 w-5" />
        </button>
      </div>
      {showSuggestions && query.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FeatureSearch;
