"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Attractions {
  name: string;
  description: string;
}

interface HiddenGems {
  name: string;
  description: string;
}

interface Restaurants {
  name: string;
  cuisine: string;
}

interface Events {
  name: string;
  date: string;
  description: string;
}

interface AreasToStay {
  name: string;
  reason: string;
}

interface TravelTips {
  tips: string[];
}

interface SuggestionsBoxProps {
  city?: string;
}

const SuggestionsBox = ({ city }: SuggestionsBoxProps) => {
  const [isCollapsibleHiddenGems, setIsCollapsibleHiddenGems] =
    useState<boolean>(false);
  const [isCollapsibleAttractions, setIsCollapsibleAttractions] =
    useState<boolean>(false);
  const [isCollapsibleRestaurants, setIsCollapsibleRestaurants] =
    useState<boolean>(false);
  const [isCollapsibleEvents, setIsCollapsibleEvents] =
    useState<boolean>(false);
  const [isCollapsibleAreasToStay, setIsCollapsibleAreasToStay] =
    useState<boolean>(false);
  const [isCollapsibleTravelTips, setIsCollapsibleTravelTips] =
    useState<boolean>(false);
  const [attractions, setAttractions] = useState<Attractions[]>([]);
  const [hiddenGems, setHiddenGems] = useState<HiddenGems[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurants[]>([]);
  const [events, setEvents] = useState<Events[]>([]);
  const [areasToStay, setAreasToStay] = useState<AreasToStay[]>([]);
  const [travelTips, setTravelTips] = useState<TravelTips>({ tips: [] });

  useEffect(() => {
    const getCityDetails = async (city: string) => {
      if (city === "") return;
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Give me a detailed travel guide for ${city} in pure JSON format with the following structure:

  {
    "top_attractions": [{ "name": "", "description": "" }],
    "hidden_gems": [{ "name": "", "description": "" }],
    "restaurants": [{ "name": "", "cuisine": "" }],
    "events": [{ "name": "", "date": "", "description": "" }],
    "areas_to_stay": [{ "name": "", "reason": "" }],
    "travel_tips": [""]
  }

  Do NOT include any extra text. Only return a valid JSON object.`,
        }),
      });
      const data = await res.json();
      const raw = data.raw;

      const jsonString = raw
        .trim()
        .replace(/^```json\n/, "")
        .replace(/\n```$/, "");

      const parsed = JSON.parse(jsonString);

      setAttractions(parsed.top_attractions || []);
      setHiddenGems(parsed.hidden_gems || []);
      setRestaurants(parsed.restaurants || []);
      setEvents(parsed.events || []);
      setAreasToStay(parsed.areas_to_stay || []);
      setTravelTips({ tips: parsed.travel_tips || [] });
    };
    if (city) {
      getCityDetails(city);
    }
  }, [city]);

  return (
    <div className="flex flex-col gap-2 rounded-xl bg-surface w-full">
      {city === "" ? (
        <div className="flex items-center justify-center p-4">
          <h3 className="text-base font-semibold text-foreground">
            Please choose place to visit to see suggestions
          </h3>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center w-full drop-shadow bg-gray-50">
            <h3 className="flex items-center gap-3 w-full p-4 text-base font-semibold text-foreground h-full bg-gray-50">
              Suggested Attractions
              {isCollapsibleAttractions ? (
                <ChevronUp
                  onClick={() => {
                    setIsCollapsibleAttractions(!isCollapsibleAttractions);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              ) : (
                <ChevronDown
                  onClick={() => {
                    setIsCollapsibleAttractions(!isCollapsibleAttractions);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              )}
            </h3>
            {!isCollapsibleAttractions && (
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1"></div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${
              isCollapsibleAttractions
                ? "max-h: auto p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-1 list-disc">
                {attractions.map((attraction, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 drop-shadow p-2 rounded h-full w-full bg-gray-50"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {attraction.name}
                    </h4>
                    <p className="text-sm font-light text-muted-foreground mb-2">
                      {attraction.description}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center w-full drop-shadow bg-gray-50">
            <h3 className="flex items-center gap-3 w-full p-4 text-base font-semibold text-foreground h-full bg-gray-50">
              Suggested Hidden Gems
              {isCollapsibleHiddenGems ? (
                <ChevronUp
                  onClick={() => {
                    setIsCollapsibleHiddenGems(!isCollapsibleHiddenGems);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              ) : (
                <ChevronDown
                  onClick={() => {
                    setIsCollapsibleHiddenGems(!isCollapsibleHiddenGems);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              )}
            </h3>
            {!isCollapsibleHiddenGems && (
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1"></div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${
              isCollapsibleHiddenGems
                ? "max-h: auto p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-1 list-disc">
                {hiddenGems.map((hiddengem, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 drop-shadow p-2 rounded h-full w-full bg-gray-50"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {hiddengem.name}
                    </h4>
                    <p className="text-sm font-light text-muted-foreground mb-2">
                      {hiddengem.description}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center w-full drop-shadow bg-gray-50">
            <h3 className="flex items-center gap-3 w-full p-4 text-base font-semibold text-foreground h-full bg-gray-50">
              Suggested Restaurants
              {isCollapsibleRestaurants ? (
                <ChevronUp
                  onClick={() => {
                    setIsCollapsibleRestaurants(!isCollapsibleRestaurants);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              ) : (
                <ChevronDown
                  onClick={() => {
                    setIsCollapsibleRestaurants(!isCollapsibleRestaurants);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              )}
            </h3>
            {!isCollapsibleRestaurants && (
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1"></div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${
              isCollapsibleRestaurants
                ? "max-h: auto p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-1 list-disc">
                {restaurants.map((restaurant, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 drop-shadow p-2 rounded h-full w-full bg-gray-50"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {restaurant.name}
                    </h4>
                    <p className="text-sm font-light text-muted-foreground mb-2">
                      {restaurant.cuisine}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center w-full drop-shadow bg-gray-50">
            <h3 className="flex items-center gap-3 w-full p-4 text-base font-semibold text-foreground h-full bg-gray-50">
              Suggested Events
              {isCollapsibleEvents ? (
                <ChevronUp
                  onClick={() => {
                    setIsCollapsibleEvents(!isCollapsibleEvents);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              ) : (
                <ChevronDown
                  onClick={() => {
                    setIsCollapsibleEvents(!isCollapsibleEvents);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              )}
            </h3>
            {!isCollapsibleEvents && (
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1"></div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${
              isCollapsibleEvents
                ? "max-h: auto p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-1 list-disc">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 drop-shadow p-2 rounded h-full w-full bg-gray-50"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {event.name}
                    </h4>
                    <h4 className="text-xs font-light text-muted-foreground mb-2">
                      {event.date}
                    </h4>
                    <p className="text-sm font-light text-muted-foreground mb-2">
                      {event.description}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center w-full drop-shadow bg-gray-50">
            <h3 className="flex items-center gap-3 w-full p-4 text-base font-semibold text-foreground h-full bg-gray-50">
              Suggested Stays
              {isCollapsibleAreasToStay ? (
                <ChevronUp
                  onClick={() => {
                    setIsCollapsibleAreasToStay(!isCollapsibleAreasToStay);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              ) : (
                <ChevronDown
                  onClick={() => {
                    setIsCollapsibleAreasToStay(!isCollapsibleAreasToStay);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              )}
            </h3>
            {!isCollapsibleAreasToStay && (
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1"></div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${
              isCollapsibleAreasToStay
                ? "max-h: auto p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-1 list-disc">
                {areasToStay.map((area, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-2 drop-shadow p-2 rounded h-full w-full bg-gray-50"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {area.name}
                    </h4>
                    <p className="text-sm font-light text-muted-foreground mb-2">
                      {area.reason}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center w-full drop-shadow bg-gray-50">
            <h3 className="flex items-center gap-3 w-full p-4 text-base font-semibold text-foreground h-full bg-gray-50">
              Travel Tips
              {isCollapsibleTravelTips ? (
                <ChevronUp
                  onClick={() => {
                    setIsCollapsibleTravelTips(!isCollapsibleTravelTips);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              ) : (
                <ChevronDown
                  onClick={() => {
                    setIsCollapsibleTravelTips(!isCollapsibleTravelTips);
                  }}
                  className="w-4 h-4 p-0.5 cursor-pointer"
                />
              )}
            </h3>
            {!isCollapsibleTravelTips && (
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full h-1"></div>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 rounded-b-lg ${
              isCollapsibleTravelTips
                ? "max-h: auto p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-6">
              <ul className="flex flex-col gap-1 list-disc">
                {travelTips.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex flex-col gap-2 drop-shadow p-2 rounded h-full w-full bg-gray-50"
                  >
                    <h4 className="text-sm font-medium text-foreground">
                      {tip}
                    </h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionsBox;
