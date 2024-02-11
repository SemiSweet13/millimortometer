import React from 'react'
import { useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Box } from '@mui/material';

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};
const MapComponent = () => {
  return (
    <Box sx={{maxHeight: '70%', border:1, paddingLeft:10, maxWidth: '95%', paddingTop: 3, paddingBottom:3}}>
      <MapContainer
        
        center={[53.3813, -6.59]}
        zoom={13}
        zoomControl={true}
        scrollWheelZoom={true}
        style={{ height: '55vh', width: '90%', display: 'flex', justifyContent:'center'}}
      >
        <ComponentResize />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  )
}

export default MapComponent