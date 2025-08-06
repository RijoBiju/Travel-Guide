import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SuggestionsBox from "@/components/SuggestionsBox";
import DayPlanBox from "@/components/DayPlanBox";
import AddDayButton from "@/components/AddDayButton";
import AddPlaceBox from "@/components/AddPlaceBox";

import { supabaseClient } from "@/lib/supabaseClient";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface Place {
  placeId: number;
  activity: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  imageUrl: string;
}

interface DayPlan {
  dayId: number;
  title: string;
  places: Place[];
}

export default function Index() {
  const [selectedDayId, setSelectedDayId] = useState<number>();
  const [tripTitle, setTripTitle] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [activity, setActivity] = useState<string>("");
  const [dayMarkers, setDayMarkers] = useState<Place[]>([]);
  const [dayPlans, setDayPlans] = useState<DayPlan[]>([]);
  const [mapCenter, setMapCenter] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTripDetails = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (!user) return;

      setUserId(user.id);

      const tripId = router.query.tripId;
      const tripTitle = router.query.tripTitle;
      if (typeof tripTitle === "string") {
        setTripTitle(tripTitle);
      }

      if (!tripId) return;

      const { data, error } = await supabaseClient
        .from("trips")
        .select("day_plans")
        .eq("user_id", user.id)
        .eq("id", tripId);

      if (error) {
        console.error("Error fetching day plans:", error);
      } else {
        setDayPlans(data?.[0]?.day_plans ?? []);
      }
    };

    fetchTripDetails();
  }, []);

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

  const onCancel = () => {
    setCity("");
    setCountry("");
    setMapCenter(null);
    setActivity("");
  };

  useEffect(() => {
    if (selectedDayId) {
      const selectedDay = dayPlans.find((day) => day.dayId === selectedDayId);
      if (selectedDay && selectedDay.places.length > 0) {
        setDayMarkers(selectedDay.places);
      } else {
        setDayMarkers([]);
      }
    }
  }, [dayPlans, selectedDayId]);

  useEffect(() => {
    if (activity) {
      onAddPlace();
    }
  }, [activity]);

  const onAddPlace = () => {
    if (!city || !country || !selectedDayId || !activity) return;
    setDayPlans((prev) =>
      prev.map((day) => {
        if (day.dayId === selectedDayId) {
          const nextPlaceId = day.places.length
            ? day.places[day.places.length - 1].placeId + 1
            : 1;
          const newPlace = {
            placeId: nextPlaceId,
            activity: activity,
            city,
            country,
            lat: mapCenter?.lat || null,
            lon: mapCenter?.lon || null,
            imageUrl: "",
          };
          return { ...day, places: [...day.places, newPlace] };
        }
        return day;
      })
    );
  };

  const onDaySelect = (dayId: number) => {
    console.log("hi");
    setSelectedDayId(dayId);
    const selectedDay = dayPlans.find((day) => day.dayId === dayId);
    if (selectedDay && selectedDay.places.length > 0) {
      const places = selectedDay.places;
      setDayMarkers(places);
    }
  };

  const onTripSave = async (tripTitle: string) => {
    if (!tripTitle || !dayPlans.length) return;

    const tripId = router.query.tripId;

    const endpoint = tripId ? "/api/updateTrip" : "/api/addTrip";
    const payload = tripId
      ? {
          trip_id: tripId,
          trip_title: tripTitle,
          day_plans: dayPlans,
        }
      : {
          user_id: userId,
          trip_title: tripTitle,
          day_plans: dayPlans,
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to save trip:", result.error);
        return;
      }

      console.log("Trip saved:", result.data);
    } catch (error) {
      console.error("Error saving trip:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-visible">
      <Navbar onTripSave={onTripSave} saveButton={true} tripTitle={tripTitle} />
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <div className="flex-[3] relative z-50">
          <Map mapCenter={mapCenter} markers={dayMarkers} />
        </div>
        <div className="w-full md:w-96 flex flex-col h-full overflow-hidden border-l border-border">
          <SearchBar
            setMapCenter={(coords) => setMapCenter(coords)}
            setCity={setCity}
            setCountry={setCountry}
          />
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
          >
            <div className="p-6 pt-0 space-y-6 w-full">
              {city && country && (
                <AddPlaceBox
                  city={city}
                  country={country}
                  selectedDayId={selectedDayId}
                  setActivity={setActivity}
                  onCancel={() => onCancel()}
                  onAddPlace={onAddPlace}
                />
              )}
              <SuggestionsBox city={city} />
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
                  onSelect={() => onDaySelect(dayPlan.dayId)}
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
