import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const LeafletMap = () => {
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapInitialized) {
      console.log('Initializing map...');
      const lat = 23.188124;
      const lon = 72.628322;

      const locations = [
        { coords: { lat: 23.188155, lng: 72.628798 } },
        { coords: { lat: 23.18837, lng: 72.628829 } },
        { coords: { lat: 23.188642, lng: 72.628731 } },
      ];

      const map = L.map('mapDiv').setView([lat, lon], 17);

      L.tileLayer('http://localhost:3001/tiles/{z}/{x}/{y}.png', {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      locations.forEach((location) => {
        L.marker([location.coords.lat, location.coords.lng]).addTo(map);
      });

      setMapInitialized(true);
      return () => {
        map.remove();
      };
    }
  }, [mapInitialized]);

  return <div id="mapDiv" style={{ width: '100%', height: '48vh' }} />;
};

export default LeafletMap;
