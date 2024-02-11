import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

/* add after Routing.control to display route
.on('routeselected', function(e){
    var route= e.route
    alert('Showing route '+ JSON.stringify(route.inputWaypoints, null, 2))
  });
*/
const createRoutineMachineLayer = ({ position, start, end, color }) => {
  const instance = L.Routing.control({
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
    
  })

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;