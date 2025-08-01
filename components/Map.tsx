import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

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
          map.flyToBounds(bounds, { duration: 2 }); // 2 seconds animation
        } else {
          map.flyTo([+lat, +lon], 6, { duration: 2 });
        }
      }
    };

    fetchCoords();
  }, [country, map]);

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

const FitBoundsToMarkers = ({ markers }: { markers: MarkerType[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!markers.length) return;

    const latLngs = markers.map((m) => [m.lat, m.lon] as [number, number]);
    const bounds = L.latLngBounds(latLngs);

    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
  }, [markers, map]);

  return null;
};

const Map = ({ countryToZoom, markers }: MapProps) => {
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

        {markers.length > 0 ? (
          <FitBoundsToMarkers markers={markers} />
        ) : (
          <FlyToCountry country={countryToZoom} />
        )}

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
