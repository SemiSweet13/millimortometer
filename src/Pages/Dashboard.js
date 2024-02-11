import React from "react";
import dayjs from 'dayjs';

import { NavLink } from 'react-router-dom';
import { AppBar, Container, CssBaseline, Toolbar, Typography, Grid, Paper, Box, TextField } from "@mui/material";
import List from '@mui/material/List';
import { Drawer, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { useState } from "react";
import FooterComponent from "../Components/Footer";
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import SelectorMenu from "../Components/SelectorMenu";
import MapComponent from "../Components/MapComponent";
import DrawerComponent from "../Components/DrawerComponent"



const dayOptions = [
  { value: '', label: 'None' },
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }

]
const genderOptions = [
  { value: '', label: 'None' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
]
const vehicleOptions = [
  { value: '', label: 'None' },
  { value: 'Car', label: 'Car' },
  { value: 'MotorBike', label: 'MotorBike' }
]
const drawerWidth = 200;

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
}));
//component called in index.js
export default function Dashboard() {
  //useStates needed for the dashboard
  const [open, setOpen] = React.useState(false)
  const [day, setDay] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [vehicle, setVehicle] = React.useState('')  
  //handle change functions
  const handleDayChange = (event) => {
    setDay(event.target.value)
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value)
  }
  const handleVehicleChange = (event) => {
    setVehicle(event.target.value)
  }

  //used to hide AppBar when scrolling with application 
  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  //elements to be rendered
  return (
    <div>
      <Box sx={{ display: 'flex', }}>
        <CssBaseline />
        {/*TOP appbar component */}
        <AppBar AppBar position="fixed" enableColorOnDark sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar >
            <StyledTypography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
            >
              Dashboard
            </StyledTypography>
          </Toolbar>
        </AppBar>
        {/*persistent left drawer component */}    
        <DrawerComponent></DrawerComponent>

        {/*MAIN component, i.e. dashboard */}
        <Box component="main" sx={{ flexGrow: 1, p: 0.5, border: 1, pb:60 }}>
          <Toolbar />
          <Grid container spacing={3} justifyContent="center" sx={{ p: '1rem' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {/* input forms Age & time of day */}
            <Grid item xs={6}>
              <Box display="flex" justifyContent="center">
                <TextField fullWidth
                  label='Driver Age' type="number"></TextField>
              </Box>
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent='center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField label="Basic time field" fullWidth />
                </LocalizationProvider>
              </Box>
            </Grid>

            {/* input forms Day of week, Gender  */}
            <Grid item xs={6}>
              <SelectorMenu label='Day' options={dayOptions} day={day} handleChange={handleDayChange}></SelectorMenu>
            </Grid>
            <Grid item xs={6} >
              <SelectorMenu label='Gender' options={genderOptions} gender={gender} handleChange={handleGenderChange}></SelectorMenu>
            </Grid>
            <Grid item xs={12}>
              <SelectorMenu label='Vehicle Type' options={vehicleOptions} vehicle={vehicle} handleChange={handleVehicleChange}></SelectorMenu>
            </Grid>
          </Grid>      
          <div style={{paddingLeft:15}}> 
            <MapComponent>
            </MapComponent>
            </div>
              
        </Box>
        
        <FooterComponent></FooterComponent>
      </Box>
    </div>//end of container div
  )

}