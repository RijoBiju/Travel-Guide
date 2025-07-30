import React from "react";
import SearchIcon from "../assets/search-icon.png";

type FeatureSearchProps = {
  onSearch?: (query: string) => void;
};

const FeatureSearch: React.FC<FeatureSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = React.useState("");

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter your Destination"
          className="w-full py-4 pl-6 pr-16 bg-white bg-opacity-80 backdrop-blur-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-md hover:shadow-lg transition"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-primary text-white rounded-full flex items-center justify-center"
        >
          <img src={SearchIcon} alt="Search" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FeatureSearch;
