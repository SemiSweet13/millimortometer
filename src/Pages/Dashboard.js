import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography, Grid, Box, TextField, Paper } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from "react";
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
import MillimortChart from "../Components/GuageChart";
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
  const [age, setAge] = React.useState('')
  const [time, setTime] = React.useState(null)

  React.useEffect(() => {
    // Reset states on component mount
    setDay('');
    setGender('');
    setMonth('');
    setAge('');
    setTime(null);
  }, []);

  const [millimort, setMillimort] = useState(0)

  const [hasAge, setHasAge] = useState(false);
  const [hasGender, setHasGender] = useState(false);
  const [hasTime, setHasTime] = useState(false);
  const [hasMonth, setHasMonth] = useState(false);
  const [hasDay, setHasDay] = useState(false);

  //alert states needed, validation is now done through backend for a more clean and efficient approach
  //alert keys used to make sure alerts re render if error happens on next/subsequent call
  const [alertKeys, setAlertKeys] = useState({
    noDataAlert: 0,
    ageAlert: 0,
    ageInvalidAlert: 0,
    timeAlert: 0,
    monthAlert: 0,
    dayAlert: 0,
    genderAlert: 0,
  })
  const [noDataAlert, setNoDataAlert] = useState(false);
  const [ageAlert, setAgeAlert] = useState(false);
  const [ageInvalidAlert, setAgeInvalidAlert] = useState(false);
  const [timeAlert, setTimeAlert] = useState(false);
  const [genderAlert, setGenderAlert] = useState(false);
  const [dayAlert, setDayAlert] = useState(false);
  const [monthAlert, setMonthAlert] = useState(false)

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

  const handleResponseValidation = (response_msg) => {
    //geenral no data provided alert
    if (response_msg === 'No User Data in Payload') {
      setNoDataAlert(true);
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, noDataAlert: prevKeys.noDataAlert + 1 }));
    }
    else {
      setNoDataAlert(false)
    }
    //alerts for Age, is it missing or invalid
    if (response_msg === "Missing or invalid value for 'Age'") {
      setAgeAlert(true)
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, ageAlert: prevKeys.ageAlert + 1 }));
    }
    else if (response_msg === 'Age must be between 17 and 120' || response_msg === 'Invalid age format') {
      setAgeInvalidAlert(true)
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, ageInvalidAlert: prevKeys.ageInvalidAlert + 1 }));
    }
    else {
      setAgeAlert(false)
      setAgeInvalidAlert(false)
    }
    //alert for missing time
    if (response_msg === "Missing or invalid value for 'Time'") {
      setTimeAlert(true)
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, timeAlert: prevKeys.timeAlert + 1 }));
    } else {
      setTimeAlert(false)
    }
    //alert for day
    if (response_msg === "Missing or invalid value for 'Day'") {
      setDayAlert(true)
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, dayAlert: prevKeys.dayAlert + 1 }));
    } else {
      setDayAlert(false)
    }
    //alert for gender
    if (response_msg === "Missing or invalid value for 'Gender'") {
      setGenderAlert(true)
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, genderAlert: prevKeys.genderAlert + 1 }));
    } else {
      setGenderAlert(false)
    }
    //alert for month
    if (response_msg === "Missing or invalid value for 'Month'") {
      setMonthAlert(true)
      // Update only the key for noDataAlert
      setAlertKeys(prevKeys => ({ ...prevKeys, monthAlert: prevKeys.monthAlert + 1 }));
    } else {
      setMonthAlert(false)
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
      //console.log(typeof(response), Object.keys(response))
      //so if we get a bad response we set an alert state to true depending on repsonse
      const response_msg = response['message']
      handleResponseValidation(response_msg)
      if(Array.isArray(response)) {
        console.log('response is an ar')
        const detailedResponse = response[1];
        console.log(detailedResponse)
        console.log('Millimort:', detailedResponse.millimort);
        setMillimort(detailedResponse.millimort)
      }
    })
      .catch(error => {
        console.error('Error:', error);
      });
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
        
            <Box display="flex" justifyContent='center' paddingTop={4}>
              <MillimortChart id='chart1' value={millimort} title={"MilliMort"} />
            </Box>
     
        </Box>

        <FooterComponent></FooterComponent>
        {/*this section covers the alerts needed for the input */}
        <div>
          {noDataAlert && (
            <CustomAlert
              key={alertKeys.noDataAlert}
              severity={'error'}
              msg={'No Data proivded please enter values'}
              title={'No Data Provided'}></CustomAlert>
          )}
          {ageAlert && (
            <CustomAlert
              key={alertKeys.ageAlert}
              severity={'error'}
              msg={'Driver age Not given please provide an age'}
              title={'Driver Age Error Warning'} />
          )}
          {ageInvalidAlert && (
            <CustomAlert
              key={alertKeys.ageInvalidAlert}
              severity={'warning'}
              msg={'Driver age Invalid: Age must be in range 17-120 '}
              title={'Driver Age Error Warning'} />
          )}
          {timeAlert && (
            <CustomAlert
              key={alertKeys.timeAlert}
              severity={'warning'}
              msg={'Time input missing or invalid, input a time of day 24hr format e.g. 12:45'}
              title={'Time Error Warning'} />
          )}
          {dayAlert && (
            <CustomAlert
              key={alertKeys.dayAlert}
              severity={'error'}
              msg={'Day input not chose, please select an option from the menu'}
              title={'Day Error Warning'} />
          )}
          {genderAlert && (
            <CustomAlert
              key={alertKeys.genderAlert}
              severity={'error'}
              msg={'Gender input not chose, please select an option from the menu'}
              title={'Gender Error Warning'} />
          )}
          {monthAlert && (
            <CustomAlert
              key={alertKeys.monthAlert}
              severity={'error'}
              msg={'Month input not chose, please select an option from the menu'}
              title={'Month Error Warning'} />
          )}
        </div>


      </Box>
    </div>//end of container div
  )

}