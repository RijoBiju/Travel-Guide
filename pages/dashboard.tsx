import { useState, useRef } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SuggestionsBox from "@/components/SuggestionsBox";
import DayPlanBox from "@/components/DayPlanBox";
import AddDayButton from "@/components/AddDayButton";

// const Map = dynamic(() => import("@/components/Map"), { ssr: false });

type MarkerType = {
  lat: number;
  lon: number;
  name: string;
};

interface Place {
  placeId: number;
  activity: string;
  city: string;
  country: string;
  imageUrl: string;
}

interface DayPlan {
  dayId: number;
  places: Place[];
  // isSelected: boolean;
  // // onSelect: () => void;
  // // onDelete: () => void;
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [selectedDayId, setSelectedDayId] = useState<number>();
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const [dayPlans, setDayPlans] = useState<DayPlan[]>([
    {
      dayId: 1,
      places: [
        {
          placeId: 1,
          activity: "Visit Bali",
          city: "Vali",
          country: "Bali",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg/640px-Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg",
        },
        {
          placeId: 2,
          activity: "Visit Bali",
          city: "Vali",
          country: "Bali",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg/640px-Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg",
        },
      ],
    },
    {
      dayId: 2,
      places: [
        {
          placeId: 1,
          activity: "Visit Bali",
          city: "Vali",
          country: "Bali",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg/640px-Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg",
        },
        {
          placeId: 2,
          activity: "Visit Bali",
          city: "Vali",
          country: "Bali",
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg/640px-Bali%2C_Extinct_caldera_slopes%2C_Forest%2C_East_Bali%2C_Indonesia.jpg",
        },
      ],
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const addDayPlan = () => {
    setDayPlans((prev) => {
      const newId = prev.length ? prev[prev.length - 1].dayId + 1 : 1;
      return [...prev, { dayId: newId, title: `Day ${newId}`, places: [] }];
    });

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  const handleDeletePlace = (dayId: number, placeId: number) => {
    setDayPlans((prev) =>
      prev.map((day) =>
        day.dayId === dayId
          ? { ...day, places: day.places.filter((p) => p.placeId !== placeId) }
          : day
      )
    );
  };

  const handleDeleteDay = (dayId: number) => {
    setDayPlans((prev) => prev.filter((day) => day.dayId !== dayId));
  };

  const handleReorderPlaces = (dayId: number, newPlaces: Place[]) => {
    setDayPlans((prev) =>
      prev.map((day) =>
        day.dayId === dayId ? { ...day, places: newPlaces } : day
      )
    );
  };

  // const updateMarkers = (id: number, newMarkers: MarkerType[]) => {
  //   setDayPlans((prev) =>
  //     prev.map((dp) => (dp.id === id ? { ...dp, markers: newMarkers } : dp))
  //   );
  // };

  // const combinedMarkers = dayPlans.flatMap((dp) => dp.markers);

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
          {/* <Map markers={combinedMarkers} center={mapCenter} /> */}
        </div>
        <div className="w-96 flex flex-col h-full overflow-hidden border-l border-border">
          <SearchBar value={search} onChange={setSearch} onSearch={onSearch} />
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
          >
            <div className="p-6 pt-0 space-y-6">
              <SuggestionsBox />
              {dayPlans.map((dayPlan, index) => (
                <DayPlanBox
                  key={dayPlan.dayId}
                  dayId={dayPlan.dayId}
                  title={`Day ${index + 1}`}
                  places={dayPlan.places}
                  onDeletePlace={handleDeletePlace}
                  onDeleteDay={handleDeleteDay}
                  onReorderPlaces={handleReorderPlaces}
                  isSelected={selectedDayId === dayPlan.dayId}
                  onSelect={() => setSelectedDayId(dayPlan.dayId)}
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
