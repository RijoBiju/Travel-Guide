import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";

const FlyToCountry = ({ country }: { country: string }) => {
  const map = useMap();

  useEffect(() => {
    if (!country) return;

    const fetchCoords = async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          country
        )}`
      );
      const data = await res.json();
      if (data && data[0]) {
        const { boundingbox, lat, lon } = data[0];
        if (boundingbox) {
          const southWest = [
            parseFloat(boundingbox[0]),
            parseFloat(boundingbox[2]),
          ];
          const northEast = [
            parseFloat(boundingbox[1]),
            parseFloat(boundingbox[3]),
          ];
          const bounds = L.latLngBounds(southWest, northEast);
          map.flyToBounds(bounds, { duration: 2 });
        } else {
          map.flyTo([+lat, +lon], 6, { duration: 2 });
        }
      }
    };

    fetchCoords();
  }, [country, map]);

  return null;
};

const UserInteractionHandler = ({
  onUserInteraction,
}: {
  onUserInteraction: () => void;
}) => {
  const interactedRef = useRef(false);
  useMapEvents({
    dragstart() {
      if (!interactedRef.current) {
        onUserInteraction();
        interactedRef.current = true;
      }
    },
    zoomstart() {
      if (!interactedRef.current) {
        onUserInteraction();
        interactedRef.current = true;
      }
    },
  });
  return null;
};

interface MarkerType {
  lat: number;
  lon: number;
  name: string;
}

interface MapProps {
  countryToZoom: string;
  markers: MarkerType[];
}

const FitBoundsToMarkers = ({
  markers,
  onUserInteraction,
  disableAutoFit,
}: {
  markers: MarkerType[];
  onUserInteraction: () => void;
  disableAutoFit: boolean;
}) => {
  const map = useMap();
  const prevMarkersRef = useRef<MarkerType[]>([]);

  useEffect(() => {
    // If markers changed, reset user interaction flag by calling a prop function
    const prevMarkers = prevMarkersRef.current;

    const markersChanged =
      prevMarkers.length !== markers.length ||
      markers.some(
        (m, i) => m.lat !== prevMarkers[i]?.lat || m.lon !== prevMarkers[i]?.lon
      );

    if (markersChanged) {
      onUserInteraction(); // Reset interaction flag to false, explained below
      prevMarkersRef.current = markers;
    }
  }, [markers, onUserInteraction]);

  useEffect(() => {
    if (!markers.length) return;
    if (disableAutoFit) return;

    const latLngs = markers.map((m) => [m.lat, m.lon] as [number, number]);
    const bounds = L.latLngBounds(latLngs);

    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [markers, map, disableAutoFit]);

  return <UserInteractionHandler onUserInteraction={onUserInteraction} />;
};

const Map = ({ countryToZoom, markers }: MapProps) => {
  const [userInteracted, setUserInteracted] = useState(false);

  // To reset the userInteracted flag on markers change, define this function:
  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  // A small trick:
  // We want to reset `userInteracted` to false when markers change (new markers added or removed)
  // So we'll watch markers with a useEffect and reset flag there
  useEffect(() => {
    // When markers change, reset userInteracted to false so map auto-fits again
    setUserInteracted(false);
  }, [markers]);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m, i) => (
          <Marker
            key={i}
            position={[m.lat, m.lon]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
