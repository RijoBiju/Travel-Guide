import { useState, useRef } from "react";

const SearchBar = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (val: string) => {
    setValue(val);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (val.length > 2) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `/api/geoAutoComplete?text=${encodeURIComponent(val)}`
          );
          if (!res.ok) return setSuggestions([]);
          const data = await res.json();
          setSuggestions(data.features || []);
        } catch {
          setSuggestions([]);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (s: any) => {
    const { city, country } = s.properties;
    setValue(city + ", " + country);
    setSuggestions([]);
  };

  return (
    <div className="p-6">
      <div className="relative rounded-md p-[2px] bg-transparent shadow-lg focus-within:bg-gradient-to-r focus-within:from-blue-500 focus-within:via-purple-500 focus-within:to-pink-500">
        <input
          placeholder="Search destinations..."
          className="pl-4 pr-16 rounded h-10 w-full border-none bg-white focus:outline-none"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border shadow max-h-48 overflow-auto z-10">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSuggestionClick(s)}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {s.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
