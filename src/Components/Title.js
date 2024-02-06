import React from "react";
import { PropTypes } from "@mui/material";
import Typography from "@mui/material/Typography";

//props that will be passed in is 
export default function Title(props) {
    return(
        <Typography component="h2" variant='h6' color={"primary"}>
            {props.children}
        </Typography>
    )
}//end export

Title.PropTypes = {
    children: PropTypes.node
};