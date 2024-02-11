import React from 'react'
import { useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Box } from '@mui/material';
//NOTEs: DO NOT import "leaflet/dist/leaflet.css" BREAKS MARKER ICON


const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

//test markers, should be maynooth uni & town
const testLocations = [
  {
    title: "Maynooth university",
    description: "Maynooth Uni ",
    coordinates: [53.3847, -6.6006],
  },
  {
    title: "Maynooth Town",
    description: "Centre of Maynooth",
    coordinates: [53.3813, -6.59],
  }
];
const MapComponent = () => {
  return (
    <Box sx={{maxHeight: '70%', border:1, paddingLeft:5, maxWidth: '99%', paddingTop: 2, paddingBottom:2}}>
      <MapContainer        
        center={[53.3813, -6.59]}
        zoom={14}
        zoomControl={true}
        scrollWheelZoom={true}
        style={{ height: '60vh', width: '90%', display: 'flex', justifyContent:'center'}}
      >
        <ComponentResize />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {testLocations.map((item) => (
        <Marker position={item.coordinates}>
          <Popup>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </Popup>
        </Marker>
      ))}

      </MapContainer>
    </Box>
  )
}

export default MapComponent