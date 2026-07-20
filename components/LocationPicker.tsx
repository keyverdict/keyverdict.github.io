'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Next.js/webpack breaks Leaflet's default marker icon resolution — standard
// fix is to point it at the CDN copies directly.
// @ts-expect-error - _getIconUrl is a private field Leaflet exposes for this exact override
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LocationPickerProps {
  onChange: (lat: number, lng: number) => void;
  initialPosition?: [number, number];
}

function ClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({
  onChange,
  initialPosition = [12.9716, 77.5946], // Bangalore, sensible default center
}: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);

  const handleSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onChange(lat, lng);
  };

  return (
    <div className="rounded-sm overflow-hidden border border-slate/40">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '260px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              handleSelect(lat, lng);
            },
          }}
        />
        <ClickHandler onSelect={handleSelect} />
      </MapContainer>
      <p className="text-xs px-3 py-2 text-slate bg-vellum-dark">
        Click the map or drag the pin to the exact building entrance.
      </p>
    </div>
  );
}
