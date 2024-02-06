import { AppBar, Container, CssBaseline, IconButton, Link, Toolbar, Typography,Grid, Paper, Box } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer,ListItem,ListItemIcon, ListItemText, Button} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ExploreIcon  from "@mui/icons-material/HomeOutlined";
import CrisisAlertIcon from "@mui/icons-material/HomeOutlined";
import { useState } from "react";

//drawer data
const data = [
    { name: "Home", icon: <HomeOutlined />,},
    { name: "Map", icon: <ExploreIcon /> },
    { name: "Risk", icon: <CrisisAlertIcon /> },
  ];

const DrawerPermanent = (openState) => {
    if(openState == false){
        openState = false;
    }
    const getList = () => (
      <div style={{ width: 250 }}>
        {data.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </div>
    );
    return (
        <div>          
          <Drawer open={openState} anchor={"left"}>
            {getList()}
          </Drawer>
        </div>
      );
}

//Footer component
const Footer = () => {
    return (
        <Container sx={{ 
            m:2,
            backgroundColor:"white",
            alignSelf:"flex-end"
        }}>
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                <Link color={"inherit"} href="https://MilliMortoMeter.com/">MilliMortoMeter</Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </Container>
    )
}

//component called in index.js
export default function Dashboard(){
    //useStates needed for the dashboard
    const [open, setOpen] = React.useState(true)
    const handleDrawer = () =>{
        setOpen(!open)
    }
    //elements to be rendered
    return(
        <div>
        <CssBaseline/>
        &&open{
            <DrawerPermanent></DrawerPermanent>
        }
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
        <Footer></Footer>
        </div>//end of container div
    )

}