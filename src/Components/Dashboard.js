import { AppBar, Container, CssBaseline, IconButton, Link, Toolbar, Typography,Grid, Paper, Box } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer,ListItem,ListItemIcon, ListItemText, Button} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ExploreIcon  from "@mui/icons-material/HomeOutlined";
import CrisisAlertIcon from "@mui/icons-material/HomeOutlined";
import { useState } from "react";
import DrawerComponent from './DrawerComponent'
import FooterComponent from "./Footer";

//drawer data
const data = [
    { name: "Home", icon: <HomeOutlined />,},
    { name: "Map", icon: <ExploreIcon /> },
    { name: "Risk", icon: <CrisisAlertIcon /> },
  ];

//component called in index.js
export default function Dashboard(){
    //useStates needed for the dashboard
    const [open, setOpen] = React.useState(false)
    const handleDrawer = () =>{
        setOpen(!open)
        return(
          <DrawerComponent></DrawerComponent>
        )
        console.log('drawer clicked')
    }
    //elements to be rendered
    return(
        <div>
        <CssBaseline/>       
        <Box>
        <AppBar position="sticky">
        <Toolbar >
            <IconButton edge="start" color="inherit" 
            aria-label="open drawer"
            onClick={handleDrawer}
            >
                <MenuIcon></MenuIcon>
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
            >
                Dashboard
            </Typography>
        </Toolbar>
        </AppBar>
        </Box>
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper >
                <Typography>test</Typography>
                
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
              <Typography>test2</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
              <Typography>test3</Typography>
              </Paper>
            </Grid>
        </Grid>
        <FooterComponent></FooterComponent>
        </div>//end of container div
    )

}