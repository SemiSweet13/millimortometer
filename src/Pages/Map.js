import React from "react";
import MapComponent from "../Components/MapComponent";
import DrawerComponent from "../Components/DrawerComponent";
import FooterComponent from "../Components/Footer";
import { Box } from "@mui/material";

const Map = () => {
    return (
        <div>
            <Box component="main" sx={{ flexGrow: 1, p: 0.5, border: 1, pb:60 }}>                
                <DrawerComponent></DrawerComponent>
                <Box sx={{width: '80%', height: '80%'}}>
                <MapComponent />
                </Box>
            </Box>
            <FooterComponent></FooterComponent>
        </div>
    )
}

export default Map