import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SuggestionsBox from "@/components/SuggestionsBox";
import DayPlanBox from "@/components/DayPlanBox";
import AddDayButton from "@/components/AddDayButton";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Index() {
  const [search, setSearch] = useState("");
  const [countryToZoom, setCountryToZoom] = useState("");
  const [markers, setMarkers] = useState<
    { lat: number; lon: number; name: string }[]
  >([]);

  // Add marker by searching place (used only for pins, NOT for zoom)
  const addMarker = async (place: string) => {
    if (!place) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`
    );
    const data = await res.json();
    if (data && data[0]) {
      const { lat, lon, display_name } = data[0];
      setMarkers((prev) => [
        ...prev,
        { lat: +lat, lon: +lon, name: display_name },
      ]);
    }
  };

  // On search submit, zoom to country only (DO NOT add marker here)
  const onSearch = () => {
    if (!search) return;
    setCountryToZoom(search);
    // Do NOT call addMarker(search) here anymore
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-[3] relative">
          <Map countryToZoom={countryToZoom} markers={markers} />
        </div>

        <div className="w-96 flex flex-col h-full overflow-hidden border-l border-border">
          <SearchBar value={search} onChange={setSearch} onSearch={onSearch} />

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <div className="p-6 pt-0 space-y-6">
              <SuggestionsBox />
              <DayPlanBox />
              <AddDayButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
