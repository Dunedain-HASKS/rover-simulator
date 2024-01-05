// // import React from "react";
// import GoogleMapReact from "google-maps-react";
// import PropTypes from "prop-types";

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// AnyReactComponent.propTypes = {
//   text: PropTypes.string.isRequired,
// };

// export default function SimpleMap() {
//   const defaultProps = {
//     center: {
//       lat: 23.2156,
//       lng: 72.6369,
//     },
//     zoom: 11,
//   };

//   const locations = [
//     { lat: 24.2156, lng: 73.6369, text: "Marker 1" },
//     { lat: 25.2156, lng: 74.6369, text: "Marker 2" },
//     { lat: 26.2156, lng: 75.6369, text: "Marker 3" },
//   ];

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: "48vh", width: "100%" }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyDSQk5EmEo5oXtUgP6ZEbSkpV3Xjhw-b1U" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         {locations.map((location, index) => (
//           <AnyReactComponent
//             key={index}
//             lat={location.lat}
//             lng={location.lng}
//             text={location.text}
//           />
//         ))}
//       </GoogleMapReact>
//     </div>
//   );
// }


import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const AnyReactComponent = ({ text, icon }) => (
  <div>
    <img src={icon} alt="Marker Icon" style={{ width: "24px", height: "24px" }} />
    {text}
  </div>
);

AnyReactComponent.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 23.2156,
      lng: 72.6369,
    },
    zoom: 11,
  };

  const locations = [
    { lat: 24.2156, lng: 73.6369, text: "Marker 1", icon: "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png" },
    { lat: 25.2156, lng: 74.6369, text: "Marker 2", icon: "URL_TO_ICON_2" },
    { lat: 26.2156, lng: 75.6369, text: "Marker 3", icon: "URL_TO_ICON_3" },
  ];

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "48vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDSQk5EmEo5oXtUgP6ZEbSkpV3Xjhw-b1U" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations.map((location, index) => (
          <AnyReactComponent
            key={index}
            lat={location.lat}
            lng={location.lng}
            text={location.text}
            icon={location.icon}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
