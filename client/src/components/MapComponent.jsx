// src/components/MapComponent.jsx
import React, { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const MapComponent = ({ centerLatitude = 22.5726, centerLongitude = 88.3639, zoom = 11 }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  // Get your API Keys from environment variables
  // const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY; // Moved to backend
  // const STADIAMAPS_API_KEY = import.meta.env.VITE_STADIAMAPS_API_KEY; // Moved to backend
  
  // Detect API root. The existing .env might have /api/aqi appended.
  // We need to strip that to get the base for /map accesses.
  const ENV_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/aqi";
  const baseUrl = ENV_API_URL.replace(/\/$/, '');
  const API_ROOT = baseUrl.includes('/aqi')
    ? baseUrl.replace(/\/aqi$/, '')
    : (baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`); // fallback if someone put just host

useEffect(() => {
   if (!mapRef.current) return;

    // Direct API key check removed as it is handled by backend proxy now

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([centerLatitude, centerLongitude], zoom);

      
      const STADIA_STYLE_ID = 'alidade_smooth'; 
      
      // Use backend proxy for Stadia tiles using API_ROOT
      const STADIA_URL = `${API_ROOT}/map/tiles/${STADIA_STYLE_ID}/{z}/{x}/{y}`;
      const STADIA_ATTRIB = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.stamen.com/">Stamen Design</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      
      const stadiaLayer = L.tileLayer(STADIA_URL, {
        attribution: STADIA_ATTRIB,
        minZoom: 0,
        maxZoom: 20,
        
      });
      stadiaLayer.addTo(mapInstance.current);

      // WAQI AQI Overlay Layer 
      // Use backend proxy for WAQI tiles
      const WAQI_URL = `${API_ROOT}/map/aqi-overlay/{z}/{x}/{y}`;
      const WAQI_ATTR = 'Air Quality Tiles &copy; <a href="http://waqi.info">waqi.info</a>';
      const waqiLayer = L.tileLayer(WAQI_URL, { attribution: WAQI_ATTR, opacity: 0.7 });
      waqiLayer.addTo(mapInstance.current);

    } else {
      mapInstance.current.setView([centerLatitude, centerLongitude], zoom);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [centerLatitude, centerLongitude, zoom]);

  return (
    <div
      ref={mapRef}
      style={{ height: '380px', width: '100%', borderRadius: '8px' }}
      className="shadow-md"
    />
  );
};

export default MapComponent;