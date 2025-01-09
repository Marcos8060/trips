"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

// Dynamic import for react-leaflet components
import dynamic from "next/dynamic";

// Dynamically import the required components from react-leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false, // Disable server-side rendering for this component
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Draggable marker component
function DraggableMarker({ lat, lng, label }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({ lat, lng });
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  useEffect(() => {
    console.log(`DraggableMarker rendered at:`, { lat, lng });
  }, [lat, lng]);

  return (
    <Marker draggable={draggable} eventHandlers={eventHandlers} position={position} ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? "Marker is draggable" : "Click here to make marker draggable"}
        </span>
        <div>{label}</div>
      </Popup>
    </Marker>
  );
}

const TripMap = ({ pickupLat, pickupLng, dropoffLat, dropoffLng }) => {
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Change the key to force the remount of the MapContainer
    setMapKey((prevKey) => prevKey + 1);
  }, [pickupLat, pickupLng, dropoffLat, dropoffLng]);

  useEffect(() => {
    console.log("TripMap props:", { pickupLat, pickupLng, dropoffLat, dropoffLng });
  }, [pickupLat, pickupLng, dropoffLat, dropoffLng]);

  return (
    <MapContainer
      key={mapKey} // This will force a re-mount of MapContainer whenever the key changes
      center={[pickupLat, pickupLng]}
      zoom={8}
      scrollWheelZoom={false}
      style={{ height: "300px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Marker for Pickup */}
      {pickupLat && pickupLng && (
        <DraggableMarker lat={pickupLat} lng={pickupLng} label="Pickup Location" />
      )}
      {/* Marker for Dropoff */}
      {dropoffLat && dropoffLng && (
        <DraggableMarker lat={dropoffLat} lng={dropoffLng} label="Dropoff Location" />
      )}
    </MapContainer>
  );
};

export default TripMap;
