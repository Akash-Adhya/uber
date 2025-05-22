import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const CurrentLocationMarker = () => {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    map.locate({
      setView: true,
      maxZoom: 14,
      timeout: 10000,
      enableHighAccuracy: true
    });

    map.on('locationfound', (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
    });

    map.on('locationerror', (e) => {
      console.error("Location access denied:", e.message);
      // Default to India coordinates if location access is denied
      map.flyTo([20.5937, 78.9629], 5);
    });

    return () => {
      map.off('locationfound');
      map.off('locationerror');
    };
  }, [map]);

  return position ? <Marker position={position} /> : null;
};

const MapView = ({ pickupCoords, destinationCoords, routeGeoJSON }) => {
  return (
    <MapContainer 
      center={[20.5937, 78.9629]} // Default to India
      zoom={14} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <CurrentLocationMarker />
      
      {pickupCoords && <Marker position={pickupCoords} />}
      {destinationCoords && <Marker position={destinationCoords} />}
      {routeGeoJSON && (
        <Polyline 
          positions={routeGeoJSON.coordinates.map(coord => [coord[1], coord[0]])} 
          color="blue" 
          weight={3}
        />
      )}
    </MapContainer>
  );
};

export default MapView;