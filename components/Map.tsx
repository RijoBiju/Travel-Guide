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

interface MarkerType {
  lat: number;
  lon: number;
  name: string;
}

interface MapProps {
  countryToZoom: string;
  markers: MarkerType[];
  searchCenter: MarkerType | null;
}

const FlyToCountry = ({
  country,
  disableFly,
}: {
  country: string;
  disableFly: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!country || disableFly) return;

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
  }, [country, disableFly, map]);

  return null;
};

const FlyToLocation = ({ center }: { center: MarkerType | null }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo([center.lat, center.lon], 13, { duration: 1.5 });
    }
  }, [center, map]);

  return null;
};

const UserInteractionHandler = ({ onInteract }: { onInteract: () => void }) => {
  const interactedRef = useRef(false);
  useMapEvents({
    dragstart() {
      if (!interactedRef.current) {
        onInteract();
        interactedRef.current = true;
      }
    },
    zoomstart() {
      if (!interactedRef.current) {
        onInteract();
        interactedRef.current = true;
      }
    },
  });
  return null;
};

// New component inside MapContainer that handles panning/zooming markers
const MarkersViewController = ({
  markers,
  userInteracted,
}: {
  markers: MarkerType[];
  userInteracted: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    if (userInteracted) return;
    if (markers.length === 0) return;

    if (markers.length === 1) {
      const m = markers[0];
      map.flyTo([m.lat, m.lon], 13, { duration: 1.5 });
    } else {
      const bounds = L.latLngBounds(
        markers.map((m) => [m.lat, m.lon] as [number, number])
      );
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    }
  }, [markers, map, userInteracted]);

  return null;
};

const Map = ({ countryToZoom, markers, searchCenter }: MapProps) => {
  const [userInteracted, setUserInteracted] = useState(false);

  // Reset interaction when markers or countryToZoom change
  useEffect(() => {
    setUserInteracted(false);
  }, [markers, countryToZoom]);

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

        <UserInteractionHandler onInteract={() => setUserInteracted(true)} />
        <FlyToCountry country={countryToZoom} disableFly={userInteracted} />
        <FlyToLocation
          center={searchCenter && !userInteracted ? searchCenter : null}
        />
        <MarkersViewController
          markers={markers}
          userInteracted={userInteracted}
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
