import React, { Component } from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

class GoogleMap extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  };

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
    }
  };

  render() {
    const { google } = this.props;
    const mapStyles = {
      width: "100%",
      height: "400px",
    };

    const initialCenter = {
      lat: 23.2156,
      lng: -72.6369,
    };

    const markers = [
      {
        position: { lat: 23.2156, lng: -72.6369 },
        icon: {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        },
        content: "<h1>Marker 1</h1>",
      },
      {
        position: { lat: 24.2156, lng: -71.6369 },
        icon: {
          url:
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/google_logo_g.svg",
        },
        content: "<h1>Marker 2</h1>",
      },
      {
        position: { lat: 25.2156, lng: -70.6369 },
        content: "<h1>Marker 3</h1>",
      },
    ];

    return (
      <Map
        google={google}
        style={mapStyles}
        initialCenter={initialCenter}
        zoom={8}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={marker.icon}
            onClick={this.onMarkerClick}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>{this.state.selectedPlace.content}</div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "YAIzaSyDwYTjxOOKIiUOdYFc0Z51EsgdeAwO2pKU",
})(GoogleMap);
