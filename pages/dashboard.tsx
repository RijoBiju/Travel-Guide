import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SuggestionsBox from "@/components/SuggestionsBox";
import DayPlanBox from "@/components/DayPlanBox";
import AddDayButton from "@/components/AddDayButton";
import Map from "@/components/Map";

const Index = () => {
  // You will need your Mapbox token here or from env
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Map Section - 3/4 width */}
        <div className="flex-1 relative">
          <Map mapboxToken={mapboxToken} />
        </div>

        {/* Sidebar - 1/4 width */}
        <div className="w-80 flex flex-col h-full overflow-hidden border-l border-border">
          <SearchBar />

          {/* Scrollable content area */}
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
};

export default Index;
