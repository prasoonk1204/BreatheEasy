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
  const WAQI_API_KEY = import.meta.env.VITE_WAQI_API_KEY;
  const STADIAMAPS_API_KEY = import.meta.env.VITE_STADIAMAPS_API_KEY; // <--- New: Get Stadia Maps token

  useEffect(() => {
    if (!mapRef.current) return;

    if (!WAQI_API_KEY) {
      console.error("VITE_WAQI_API_KEY is not defined. WAQI map overlay might not load.");
      return;
    }
    if (!STADIAMAPS_API_KEY) { // <--- New: Check Stadia Maps token
      console.error("VITE_STADIAMAPS_API_KEY is not defined. Base map will not load.");
      return;
    }

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([centerLatitude, centerLongitude], zoom);

      // --- Stadia Maps Base Layer (Replaces Mapbox) ---
      // Stadia Maps offers various styles. 'alidade_smooth' is a good, clean option.
      // Other options include 'alidade_smooth_dark', 'osm_bright', 'outdoors', etc.
      // You can browse their styles at https://docs.stadiamaps.com/reference/tiles/
      const STADIA_STYLE_ID = 'alidade_smooth'; // Or choose another style
      // The {language} placeholder is automatically handled by Leaflet-style URL parameters if you specify it
      const STADIA_URL = `https://tiles.stadiamaps.com/tiles/${STADIA_STYLE_ID}/{z}/{x}/{y}{r}.png?api_key=${STADIAMAPS_API_KEY}`;
      const STADIA_ATTRIB = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.stamen.com/">Stamen Design</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      
      const stadiaLayer = L.tileLayer(STADIA_URL, {
        attribution: STADIA_ATTRIB,
        minZoom: 0,
        maxZoom: 20,
        // The language parameter for Stadia Maps is typically part of the style,
        // or implicitly handled by the client's locale. For 'alidade_smooth',
        // labels are generally in English. If you need explicit control,
        // you might look for a specific style that supports it via a URL parameter,
        // but 'alidade_smooth' should work well for English.
      });
      stadiaLayer.addTo(mapInstance.current);

      // WAQI AQI Overlay Layer (remains the same)
      const WAQI_URL = `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${WAQI_API_KEY}`;
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
  }, [centerLatitude, centerLongitude, zoom, WAQI_API_KEY, STADIAMAPS_API_KEY]); // Add STADIAMAPS_API_KEY to dependencies

  return (
    <div
      ref={mapRef}
      style={{ height: '380px', width: '100%', borderRadius: '8px' }}
      className="shadow-md"
    />
  );
};

export default MapComponent;