import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography, Grid, Box, TextField, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
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
import CustomAlert from "../Components/Alert";
import { Util } from "leaflet";
import { render } from "@testing-library/react";
//conext
import { useRoute } from "../Components/RouteContext";
//backend sned data
import { sendPayloadToBackend } from "../Calls/SendCall";

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
const monthOptions = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
]
const drawerWidth = 200;

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
}));
//component called in index.js
export default function Dashboard() {
  //ROUTE CONTEXT
  const { route } = useRoute();
  //console.log('ROUTE CONTEXT INSIDE DASHBOARD', route) //works!!!!!

  //useStates needed for the dashboard
  const [day, setDay] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [month, setMonth] = React.useState('')
  const [age, setAge] = useState('')
  const [time, setTime] = useState(null)

  const [hasAge, setHasAge] = useState(false);
  const [hasGender, setHasGender] = useState(false);
  const [hasTime, setHasTime] = useState(false);
  const [hasMonth, setHasMonth] = useState(false);
  const [hasDay, setHasDay] = useState(false);

  //states for stepper
  const [activeStep, setActiveStep] = useState(0);
  const stepTheme = useTheme();

  //alert states needed
  const [ageAlert, setAgeAlert] = useState(false);
  const [timeAlert, setTimeAler] = useState(false);
  const [genderAlert, setgenderAlert] = useState(false);
  const [dayAlert, setDayAlert] = useState(false);

  const [allowCall, setAllowCall] = useState(false);
  //Using a UseState Object to check all forms for validation
  //handle change functions
  const handleDayChange = (event) => {
    setDay(event.target.value)
    //if there is a chosen day update validator state
    if (day != null) {
      setHasDay(true)
      //handleValidation()
    }
  }
  const handleGenderChange = (event) => {
    setGender(event.target.value)
    if (gender != null) {
      setHasGender(true)
      // handleValidation()
    }
  }
  const handleMonthChange = (event) => {
    setMonth(event.target.value)
    if (month != null) {
      setHasMonth(true)
      //handleValidation()
    }
  }
  const handleTimeChange = (event) => {
    console.log(event)
    if (event != null) {
      setTime(event['$d'])
      setHasTime(true)
      // handleValidation()
    }
    else {
      setHasTime(false)
    }
  }
  const handleOnBlurAge = (event) => {
    //so will validate age this way instead, this will be called when the driver age field is not selected,
    //i.e. when its clicked off of, not only works once per render it seems
    const value = event.target.value
    let validatedValue = value;

    // Ensure the value is a number
    if (!isNaN(value) && value !== '') {
      // Convert the value to a number for comparison
      const numericValue = Number(value);
      // Check if the value is within the desired range
      if (numericValue < 17 || numericValue > 120) {
        setAgeAlert(true)
      }
      setAge(validatedValue);
      setHasAge(true)
      //handleValidation()
    }
  }

  const handleRiskClick = () => {
    console.log("Risk Button Clicked")
    //log all varibles TEST DELETE AFTER
    console.log('LOGGING USE STATES VARIABLES \n', month, day, age, gender, time)
    //here we check that all forms are valid and decide if we allow the backend call to be made
    //if not we will set an appropriate alert state to tell our user the issue
    console.log('has Time', hasTime)
    console.log('has gender', hasGender)
    console.log('has day', hasDay)
    console.log('has Age', hasAge)
    console.log('has Month', hasMonth)
    if (hasGender && hasTime && hasDay && hasAge && hasMonth) {
      console.log('inside if statement')
      console.log('age alert status:', ageAlert)
      if (!ageAlert) { //if alert is false call can be made 
        setAllowCall(true)
      } else {
        setAgeAlert(false)
      }
    }
    else {
      setAllowCall(false)
      console.log('CALL SHOULD BE not be MADE TO BACKEND')
    }
    if (allowCall && !ageAlert) {
      console.log('CALL SHOULD BE MADE TO BACKEND')
    }
  }

  const handleSendCall = () => {
    const dataToSend = {
      Age: age, 
      Time: time, 
      Gender: gender, 
      Day: day, 
      Month: month,
      Route: route.instructions
    }
    sendPayloadToBackend(dataToSend).then(response => {
      // Handle the response from the backend
      console.log('Backend response:', response);
    })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  /* const handleValidation = () =>{
  //   //just check that all fields are met if so we set allowClick/call to true which will then ungray the button
  //   if (hasGender && hasTime && hasDay && hasAge && hasMonth) {      
  //     if (!ageAlert) { //if alert is false call can be made 
  //       setAllowCall(true)     
  //     } else {
  //       setAgeAlert(false)
  //       setAllowCall(false)              
  //     }
  //   }
  // }
  // const testButtonClick = () => {
  //   console.log('Button clicked backend can be called') 
  // }
  */

  //stepper functions
  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleStepReset = () => {
    setActiveStep(0)
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
                  value={age}
                  onChange={(e) => setAge(e.target.value)} //sets age then will be checked with onBlur
                  onBlur={handleOnBlurAge}
                  inputProps={{
                    min: 17,
                    max: 120,
                    pattern: "[0-9]*"
                    //this only works if arrows are used so we need a handler
                  }}
                >
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent='center'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimeField ampm={false} label="Time of Day" fullWidth
                    onChange={handleTimeChange}
                  />

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
              <SelectorMenu label='Month' options={monthOptions} month={month} handleChange={handleMonthChange}></SelectorMenu>
            </Grid>
          </Grid>
          <div style={{ paddingLeft: 15 }}>
            <MapComponent>
            </MapComponent>
          </div>

          <Button size="large" variant="outlined" fullWidth onClick={handleSendCall}>Calculate Risk</Button>
        </Box>

        <FooterComponent></FooterComponent>
        {/*this section covers the alerts needed for the input */}
        {ageAlert && (
          <CustomAlert msg={'Driver age must be between 17-120'} title={'Driver Age Error Warning'} />
        )}

      </Box>
    </div>//end of container div
  )

}