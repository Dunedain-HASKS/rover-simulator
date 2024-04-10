import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/api/rover/latest3")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          const mapDiv = document.getElementById("mapDiv");
          const lat = data[data.length - 1] ? data[data.length - 1].latitude : 23.188212;
          const lon = data[data.length - 1] ? data[data.length - 1].longitude : 72.628232;
          // console.log("Data recieved for map after 5 seconds", data);

          if (mapDiv && !mapDiv._leaflet_id) {
            const map = L.map("mapDiv").setView([lat, lon], 13);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
              maxZoom: 19,
            }).addTo(map);

            for (let i = 0; i < data.length; i++) {
              L.marker([data[i].latitude, data[i].longitude]).addTo(map);
            }
            L.circleMarker(
              [data[data.length - 1].latitude, data[data.length - 1].longitude],
              { radius: 10 }
            ).addTo(map);
          }
          setLocations(data);
          // console.log("location:", locations);
        })
        .catch((error) => console.log("Error: ", error));
    };
    fetchData();

    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Clean up interval to avoid memory leaks
    return () => clearInterval(interval);
  }, [locations]);


  // useEffect(() => {
  //   // console.log("location:", locations);
  // }, [locations]);

  return <div id="mapDiv" style={{ width: "100%", height: "48vh" }}></div>;
};

export default MapComponent;
