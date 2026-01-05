import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const RiskMap = ({ onLocationSelect, selectedLocation, layers, simulatedRainfall }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([28.5, 82], 5);

      // Use dark tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap, &copy; CartoDB',
        maxZoom: 19,
      }).addTo(map.current);
    }

    // Update marker when location changes
    if (selectedLocation) {
      if (markerRef.current) {
        map.current.removeLayer(markerRef.current);
      }

      const riskColor = selectedLocation.risk === 'high' ? '#ef4444' : 
                       selectedLocation.risk === 'medium' ? '#f59e0b' : '#10b981';

      const customIcon = L.divIcon({
        html: `<div style="background-color: ${riskColor}; width: 24px; height: 24px; border-radius: 50%; box-shadow: 0 0 10px ${riskColor}; border: 3px solid white;"></div>`,
        iconSize: [24, 24],
        className: 'animate-pulse'
      });

      markerRef.current = L.marker(
        [selectedLocation.lat, selectedLocation.lng],
        { icon: customIcon }
      )
        .bindPopup(`<strong>${selectedLocation.name}</strong><br/>Risk: ${selectedLocation.risk}`)
        .addTo(map.current);

      map.current.flyTo([selectedLocation.lat, selectedLocation.lng], 8, { duration: 1 });
    }
  }, [selectedLocation]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: '500px' }}
    />
  );
};

export default RiskMap;
