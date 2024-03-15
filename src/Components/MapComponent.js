import React from 'react'
import { useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Box } from '@mui/material';
//NOTEs: DO NOT import "leaflet/dist/leaflet.css" BREAKS MARKER ICON
import RoutingControl from './MapRouting'
import { LayersControl } from 'react-leaflet';
//lifting context with route
import { useRoute } from './RouteContext';

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


//journey route
const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};
const MapComponent = () => {
  const { setRoute } = useRoute(); // Destructure setRoute for updating the route

  //use States
  const [map, setMap] = useState(null);
  const [start, setStart] = useState([53.095, -7.9129])
  const [end, setEnd] = useState([53.3813, -6.59])
  const [route, setRouteInfo] = useState(null); //contains route directions


  //handler for when a new route is selected

  // Callback function to be called when a route is selected
  const handleRouteSelected = (route) => {
    //console.log('INSIDE HANDLEROUTE', route) works
    setRoute(route); // Update the route in the context
    setRouteInfo(route); // Update the state with the selected route data
    console.log('Route selected:', route);
  };

  return (
    <Box sx={{ maxHeight: '70%', border: 1, paddingLeft: 5, maxWidth: '99%', paddingTop: 2, paddingBottom: 2 }}>
      <MapContainer
        center={[53.3813, -6.59]}
        zoom={14}
        zoomControl={true}
        scrollWheelZoom={false}
        style={{ height: '60vh', width: '95%', display: 'flex', justifyContent: 'center' }}
        whenCreated={map => setMap(map)}
      >
        <ComponentResize />
         <RoutingControl 
          position={'topright'} 
          start={start} 
          end={end} 
          color={'red'}
          onRouteSelected={handleRouteSelected} // Pass the callback as a prop
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>


      </MapContainer>
    </Box>
  )
}

export default MapComponent