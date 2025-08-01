import React, { useState, useEffect, useRef, useMemo } from "react";
import debounce from "lodash.debounce";

interface PlaceSuggestion {
  properties: {
    formatted: string;
    city?: string;
    country?: string;
    lat: number;
    lon: number;
  };
}

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    activity: string,
    location: string,
    coords: { lat: number; lon: number }
  ) => void;
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activity, setActivity] = useState("");
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [selected, setSelected] = useState<PlaceSuggestion | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      setActivity("");
      setInput("");
      setSuggestions([]);
      setSelected(null);
    }
  }, [isOpen]);

  const fetchSuggestions = async (text: string) => {
    const res = await fetch(
      `/api/geoAutoComplete?text=${encodeURIComponent(text)}`
    );
    if (!res.ok) return setSuggestions([]);
    const data = await res.json();
    setSuggestions(data.features || []);
  };

  const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 300), []);

  const handleChange = (val: string) => {
    setInput(val);
    setSelected(null);
    if (val.length < 3) {
      setSuggestions([]);
      return;
    }
    debouncedFetch(val);
  };

  const selectSuggestion = (s: PlaceSuggestion) => {
    setSelected(s);
    const { city, country, formatted } = s.properties;
    const display =
      city && country
        ? `${city}, ${country}`
        : formatted.split(", ").slice(-2).join(", ");
    setInput(display);
    setSuggestions([]);
  };

  const handleSave = () => {
    if (!activity || !selected) {
      alert("Please fill both activity and place");
      return;
    }
    const { lat, lon, city, country } = selected.properties;
    const finalCity =
      city || selected.properties.formatted.split(", ").slice(-3, -2)[0];
    const finalCountry =
      country || selected.properties.formatted.split(", ").slice(-1)[0];
    onSave(activity, finalCity + ", " + finalCountry, { lat, lon });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col gap-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>

        <div>
          <label className="block mb-1 font-medium">Activity</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="What will you do?"
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="relative">
          <label className="block mb-1 font-medium">Place</label>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Type a place..."
            className="w-full border rounded px-3 py-2"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border shadow max-h-48 overflow-auto z-10">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => selectSuggestion(s)}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {s.properties.formatted}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-auto flex justify-end">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
