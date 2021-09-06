import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const Map = ({ coordinates, handleCoordinates, type }) => {
  if (type === "create") {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={5}
        onClick={(e) => {
          handleCoordinates(e);
        }}
      >
        <Marker lat={coordinates?.lat} lng={coordinates?.lng} />
      </GoogleMapReact>
    );
  } else {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={5}
      >
        <Marker lat={coordinates.lat} lng={coordinates.lng} />
      </GoogleMapReact>
    );
  }
};

export default Map;
