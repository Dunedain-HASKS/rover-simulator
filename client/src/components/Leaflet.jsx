import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/rover/latest3")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
      .then((data) => {
        console.log(data);
        const mapDiv = document.getElementById("mapDiv");
      const lat =  data[0] ? data[0].latitude : 23.188212;
      const lon = data[0] ? data[0].longitude : 72.628232;
      console.log(data, "ok");

      if (mapDiv && !mapDiv._leaflet_id) {
        const map = L.map("mapDiv").setView([lat, lon], 18);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        for (let i = 0; i <= data.length; i++) {
          L.marker([data[i].latitude, data[i].longitude]).addTo(map);
        }
      }
        setLocations(data);
        // console.log(locations);
      })
      .catch((error) => console.log("Error: ", error));
  }, []);

  useEffect(() => {
    // const mapDiv = document.getElementById("mapDiv");
    // const lat =  locations[0] ? locations[0].latitude : 23.188212;
    // const lon = locations[0] ? locations[0].longitude : 72.628232;
    // console.log(locations, "ok");

    // if (mapDiv && !mapDiv._leaflet_id) {
    //   const map = L.map("mapDiv").setView([lat, lon], 18);

    //   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    //     maxZoom: 19,
    //   }).addTo(map);

    //   for (let i = 0; i < locations.length; i++) {
    //     L.marker([locations[i].latitude, locations[i].longitude]).addTo(map);
    //   }
    // }
  }, []); 

  return <div id="mapDiv" style={{ width: "100%", height: "48vh" }}></div>;
};

export default MapComponent;
