import React, { useState, useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    activity: string,
    place: string,
    placeCoords: { lat: number; lon: number },
    imageUrl: string
  ) => void;
}

interface Suggestion {
  properties: {
    formatted: string;
    place_id: string;
    lat: number;
    lon: number;
  };
}

const AddActivityModal: React.FC<AddActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [activity, setActivity] = useState("");
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
    else {
      setActivity("");
      setPlace("");
      setSuggestions([]);
      setSelected(null);
      setImageUrl("");
    }
  }, [isOpen]);

  const fetchSuggestions = async (text: string) => {
    try {
      const res = await fetch(
        `/api/geo-autocomplete?text=${encodeURIComponent(text)}`
      );
      if (!res.ok) return setSuggestions([]);
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch {
      setSuggestions([]);
    }
  };

  const debouncedFetch = useMemo(() => debounce(fetchSuggestions, 300), []);

  const handlePlaceChange = (val: string) => {
    setPlace(val);
    setSelected(null);
    setImageUrl("");
    if (val.length < 3) return setSuggestions([]);
    debouncedFetch(val);
  };

  const selectPlace = async (s: Suggestion) => {
    setSelected(s);
    setPlace(s.properties.formatted);
    setSuggestions([]);
    try {
      const res = await fetch(
        `/api/geo-place-details?place_id=${encodeURIComponent(
          s.properties.place_id
        )}`
      );
      const data = await res.json();
      const feat = data.features?.[0];
      const img = feat?.properties?.photo?.url || "";
      setImageUrl(img);
    } catch {
      setImageUrl("");
    }
  };

  const handleSave = () => {
    if (!activity || !selected) {
      alert("Fill in both fields");
      return;
    }
    const { lat, lon } = selected.properties;
    onSave(activity, place, { lat, lon }, imageUrl);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative flex gap-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>
        <div className="w-36 h-36 border border-gray-300 rounded-md overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm p-2">No image</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Activity</label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="What will you do?"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">Place</label>
            <input
              type="text"
              value={place}
              onChange={(e) => handlePlaceChange(e.target.value)}
              ref={inputRef}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="off"
              placeholder="Start typing place..."
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b shadow max-h-48 overflow-auto z-10">
                {suggestions.map((s) => (
                  <li
                    key={s.properties.place_id}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => selectPlace(s)}
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
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-5 py-2 rounded hover:brightness-110 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddActivityModal;
