import React from "react";
import DrawerComponent from "../Components/DrawerComponent";
import { Box } from "@mui/material";
import FooterComponent from "../Components/Footer";

const Risk = () => {
    return (
        <div>
            <Box sx={{paddingBottom: 60}}>        
            <DrawerComponent/>
            </Box>
            <FooterComponent/>
        </div>
    )
}

export default Risk