// import React from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

AnyReactComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const locations = [
    { lat: 10.99835602, lng: 77.01502627, text: "Marker 1" },
    { lat: 11.0, lng: 77.02, text: "Marker 2" },
    { lat: 10.98, lng: 77.03, text: "Marker 3" },
  ];

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YAIzaSyDwYTjxOOKIiUOdYFc0Z51EsgdeAwO2pKU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {locations.map((location, index) => (
          <AnyReactComponent
            key={index}
            lat={location.lat}
            lng={location.lng}
            text={location.text}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
