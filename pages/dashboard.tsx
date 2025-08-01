import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SuggestionsBox from "@/components/SuggestionsBox";
import DayPlanBox from "@/components/DayPlanBox";
import AddDayButton from "@/components/AddDayButton";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

type MarkerType = {
  lat: number;
  lon: number;
  name: string;
};

type DayPlan = {
  id: number;
  title: string;
  markers: MarkerType[];
};

export default function Index() {
  const [search, setSearch] = useState("");
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [dayPlans, setDayPlans] = useState<DayPlan[]>([
    { id: 1, title: "Day 1", markers: [] },
  ]);

  const addDayPlan = () => {
    setDayPlans((prev) => {
      const newId = prev.length ? prev[prev.length - 1].id + 1 : 1;
      return [...prev, { id: newId, title: `Day ${newId}`, markers: [] }];
    });
  };

  const updateMarkers = (id: number, newMarkers: MarkerType[]) => {
    setDayPlans((prev) =>
      prev.map((dp) => (dp.id === id ? { ...dp, markers: newMarkers } : dp))
    );
  };

  const combinedMarkers = dayPlans.flatMap((dp) => dp.markers);

  const onSearch = async () => {
    if (!search) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        search
      )}`
    );
    const data = await res.json();
    if (data && data[0]) {
      const { lat, lon } = data[0];
      setMapCenter({ lat: +lat, lon: +lon });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-[3] relative">
          <Map markers={combinedMarkers} center={mapCenter} />
        </div>
        <div className="w-96 flex flex-col h-full overflow-hidden border-l border-border">
          <SearchBar value={search} onChange={setSearch} onSearch={onSearch} />
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            <div className="p-6 pt-0 space-y-6">
              <SuggestionsBox />
              {dayPlans.map((dayPlan) => (
                <DayPlanBox
                  key={dayPlan.id}
                  dayTitle={dayPlan.title}
                  markers={dayPlan.markers}
                  setMarkers={(markers) => updateMarkers(dayPlan.id, markers)}
                />
              ))}
              <AddDayButton onClick={addDayPlan} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
