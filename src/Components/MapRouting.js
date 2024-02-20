import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { geocoders } from "leaflet-control-geocoder";
/* add after Routing.control to display route
.on('routeselected', function(e){
    var route= e.route
    alert('Showing route '+ JSON.stringify(route.inputWaypoints, null, 2))
  });
*/
//using a callback with onRouteSelected so map auto updates and obtains the new directions needed
const createRoutineMachineLayer = ({ position, start, end, color, onRouteSelected }) => {
  const instance = L.Routing.control({
    collapsible:true, //shows an x button to close route popup window, defaults to false on larger screens
    position,
    waypoints: [
      start,
      end
    ],
    lineOptions: {
      styles: [
        {
          color,
          weight: 3,
          opacity: 0.7,
        },
      ],    
    },
    fitSelectedRoutes: true, //makes the map show whole route either zooms in/out
    geocoder: L.Control.Geocoder.nominatim(),
    
    
  }).on('routeselected', function(e) {
    const route = e.route;
    console.log('Selected route:', route);

    //Possible code breaker, currently testing ////////////////////////////////////////
    // Call the callback with the route data
    if (onRouteSelected) {
      onRouteSelected(route);
    }

    //Example: Access waypoints, summary, or any other property
    //console.log('Waypoints:', route.waypoints);
    //console.log('Summary (distance, time):', route.summary);
    
  });
  // console.log(instance) 
  // console.log(instance.options.selectedRoute)
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);
console.log('Logging the routing machine in MapRouting.js', RoutingMachine)

export default RoutingMachine;