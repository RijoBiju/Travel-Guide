import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

type MarkerType = {
  lat: number;
  lon: number;
  placeId?: string | number;
  name?: string;
};

type MapProps = {
  mapCenter?: { lat: number; lon: number };
  markers?: MarkerType[];
};

function FlyToLocation({
  mapCenter,
}: {
  mapCenter?: { lat: number; lon: number };
}) {
  const map = useMap();
  useEffect(() => {
    if (
      mapCenter &&
      typeof mapCenter.lat === "number" &&
      typeof mapCenter.lon === "number"
    ) {
      map.flyTo([mapCenter.lat, mapCenter.lon], 13, { duration: 2 });
    }
  }, [mapCenter, map]);
  return null;
}

function FitBoundsToMarkers({ markers = [] }: { markers: MarkerType[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 1) {
      const bounds = L.latLngBounds(
        markers.map((m) => [m.lat, m.lon] as [number, number])
      );
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
    } else if (markers.length === 1) {
      map.flyTo([markers[0].lat, markers[0].lon], 13, { duration: 1.5 });
    }
  }, [markers, map]);
  return null;
}

const Map = ({ mapCenter, markers = [] }: MapProps) => {
  const hasMarkers = Array.isArray(markers) && markers.length > 0;

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[20, 0] as [number, number]}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ minHeight: "300px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FlyToLocation mapCenter={mapCenter} />
        {hasMarkers && <FitBoundsToMarkers markers={markers} />}
        {hasMarkers &&
          markers.map((m, i) => (
            <Marker
              key={m.placeId ?? i}
              position={[m.lat, m.lon]}
              icon={L.divIcon({
                className: "custom-number-marker",
                html: `<div style="
                  background: #fff;
                  border: 2px solid #3b82f6;
                  border-radius: 50%;
                  width: 32px;
                  height: 32px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  color: #3b82f6;
                  font-size: 16px;
                ">${m.placeId}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              })}
            >
              <Popup>{m.name ? m.name : `Place #${m.placeId}`}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
