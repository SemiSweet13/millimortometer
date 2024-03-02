import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography, Grid, Box, TextField } from "@mui/material";
import { useState } from "react";
import FooterComponent from "../Components/Footer";
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Button from '@mui/material/Button';
import SelectorMenu from "../Components/SelectorMenu";
import MapComponent from "../Components/MapComponent";
import DrawerComponent from "../Components/DrawerComponent"


const dayOptions = [
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' }

]
const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Prefer Not to Say', label: 'Prefer Not to Say' }
]
const vehicleOptions = [
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
  const [day, setDay] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [vehicle, setVehicle] = React.useState('')

  const [hasAge, setHasAge] = useState(false);
  const [hasGender, setHasGender] = useState(false);
  const [hasTime, setHasTime] = useState(false);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [hasDay, setHasDay] = useState(false);

  //Using a UseState Object to check all forms for validation
  //handle change functions
  const handleDayChange = (event) => {
    setDay(event.target.value)
    //if there is a chosen day update validator state
    if (day) {
      setHasDay(true)
    }
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value)
    if (gender) {
      setHasGender(true)
    }
  }
  const handleVehicleChange = (event) => {
    setVehicle(event.target.value)
    if (vehicle) {
      setHasVehicle(true)
    }
  }
  //Section to VALIDATE all Input Forms  
  const handleAgeValidation = (val) => {
    //only accepts age range of 17-120 inclusive
    if (val >= 17 || val <= 120) {
      //set hasAge to true
      setHasAge(true)
    }
    else {
      setHasAge(false)
    }
  }

  //elements to be rendered
  return (
    <div>
      <Box sx={{ display: 'flex', }}>
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
        <DrawerComponent></DrawerComponent>

        {/*MAIN component, i.e. dashboard */}
        <Box component="main" sx={{ flexGrow: 1, p: 0.5, border: 1, pb: 60 }}>
          <Toolbar />
          <Grid container spacing={3} justifyContent="center" sx={{ p: '1rem' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

            {/* input forms Age & time of day */}
            <Grid item xs={6}>
              <Box display="flex" justifyContent="center">
                <TextField fullWidth
                  label='Driver Age' type="number"
                  inputProps={{
                    min: 17,
                    max: 120
                  }}>
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent='center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField label="Time of Day" fullWidth />
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
          <div style={{ paddingLeft: 15 }}>
            <MapComponent>
            </MapComponent>
          </div>
          <Box component="main" sx={{ flexGrow: 1, p: 2}}>
            <Button size="large" variant="outlined" fullWidth>Calculate Risk</Button>
          </Box>


        </Box>

        <FooterComponent></FooterComponent>
      </Box>
    </div>//end of container div
  )

}