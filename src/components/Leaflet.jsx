import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  useEffect(() => {
    const mapDiv = document.getElementById("mapDiv");
    const lat = 23.188124;
    const lon = 72.628322;

    if (mapDiv && !mapDiv._leaflet_id) {
      // Check if map container is not initialized
      const locations = [
        { coords: { lat: 23.188155, lng: 72.628798 } },
        { coords: { lat: 23.18837, lng: 72.628829 } },
        { coords: { lat: 23.188642, lng: 72.628731 } },
      ];

      const map = L.map("mapDiv").setView([lat, lon], 17);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      for (let i = 0; i < locations.length; i++) {
        L.marker([locations[i].coords.lat, locations[i].coords.lng]).addTo(map);
      }
    }
  }, []); // Empty dependency array ensures it runs only once on mount

  return <div id="mapDiv" style={{ width: "100%", height: "48vh" }}></div>;
};

export default MapComponent;
