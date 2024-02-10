import React from "react";
import dayjs from 'dayjs';
import { AppBar, Container, CssBaseline,Toolbar, Typography, Grid, Paper, Box, TextField } from "@mui/material";
import List from '@mui/material/List';
import { Drawer, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { useState } from "react";
import FooterComponent from "./Footer";
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import SelectorMenu from "./SelectorMenu";

//drawer data
const data = [
  { name: "Home", icon: HomeOutlined },
  { name: "Map", icon: ExploreIcon },
  { name: "Risk", icon: CrisisAlertIcon },
];

const dayOptions = [
  {value: '', label: 'None'},
  {value: 'Monday', label: 'Monday'},
  {value: 'Tuesday', label: 'Tuesday'},
  {value: 'Wednesday', label: 'Wednesday'},
  {value: 'Thursday', label: 'Thursday'},
  {value: 'Friday', label: 'Friday'},
  {value: 'Saturday', label: 'Saturday'},
  {value: 'Sunday', label: 'Sunday'}

]
const genderOptions = [
  {value: '', label: 'None'},
  {value: 'Male', label: 'Male'},
  {value: 'Female', label: 'Female'}
]
const vehicleOptions = [
  {value: '', label: 'None'},
  {value: 'Car', label: 'Car'},
  {value: 'MotorBike', label: 'MotorBike'}
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
  const handleDayChange = (event) =>{
    setDay(event.target.value) 
  }
  const handleGenderChange = (event) =>{
    setGender(event.target.value) 
  }
  const handleVehicleChange = (event) =>{
    setVehicle(event.target.value) 
  }
  //elements to be rendered
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/*TOP appbar component */}        
        <AppBar AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
        <Drawer
          variant="permanent"
          sx={{
            width: 1/4,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 1/4, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          {/* fix list item height in cleanup */}
          <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100' }}> 
            <List>
              {data.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {/* Render the icon component */}
                      <item.icon/>
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        {/*MAIN component, i.e. dashboard */}    
        <Box component="main" sx={{ flexGrow: 1, p: 0.5 , border: 1}}>
          <Toolbar />          
          <Grid container spacing={3} justifyContent="center" sx={{ p: '1rem'}} rowSpacing={1} columnSpacing={{xs:1, sm:2, md:3}}>
            
            {/* input forms Age & time of day */}                      
              <Grid item xs = {6}>
                <Box display="flex" justifyContent="center">
                  <TextField fullWidth
                    label='Driver Age' type="number"></TextField>
                </Box>
              </Grid>          
              <Grid item xs = {6} >
                <Box display="flex" justifyContent='center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>     
                  <TimeField label="Basic time field" fullWidth />     
                </LocalizationProvider>
                </Box>
              </Grid>

               {/* input forms Day of week, Gender  */}                      
               <Grid item xs = {6}>                
                  <SelectorMenu label='Day' options={dayOptions} day={day} handleChange = {handleDayChange}></SelectorMenu>
              </Grid>          
              <Grid item xs = {6} >                
                  <SelectorMenu label = 'Gender' options={genderOptions} gender={gender} handleChange = {handleGenderChange}></SelectorMenu>
              </Grid>
              <Grid item xs = {12}>                
                  <SelectorMenu  label = 'Vehicle Type' options={vehicleOptions} vehicle={vehicle} handleChange = {handleVehicleChange}></SelectorMenu>                
              </Grid>

            <Grid item xs={12}>
              <Box sx={{border:1}}>
                {/*Map preview */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <FooterComponent></FooterComponent>
      </Box>
    </div>//end of container div
  )

}