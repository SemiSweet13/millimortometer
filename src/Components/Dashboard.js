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
import { TimeField } from "@mui/x-date-pickers/TimeField";


//drawer data
const data = [
  { name: "Home", icon: HomeOutlined },
  { name: "Map", icon: ExploreIcon },
  { name: "Risk", icon: CrisisAlertIcon },
];
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
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />          
          <Grid container spacing={3} justifyContent="center" sx={{ p: '1rem'}} rowSpacing={1} columnSpacing={{xs:1, sm:2, md:3}}>
            <Grid item xs={12}>
              <Box sx={{ border: 1, borderRadius:'16px' }}>
                <StyledTypography>Journey Details enter required information</StyledTypography>
              </Box>
            </Grid>
            {/* input forms Age & time of day */}                      
              <Grid item xs = {6}>
                <Box display="flex" justifyContent="center">
                  <TextField fullWidth
                    label='age' type="number"></TextField>
                </Box>
              </Grid>          
              <Grid item xs = {6} >
                <Box display="flex" justifyContent='center'>
                  <TextField fullWidth
                    label='Time of day 24hr' type="number">                      
                    </TextField>
                </Box>
              </Grid>

               {/* input forms Day of week, Gender  */}                      
               <Grid item xs = {6}>
                <Box display="flex" justifyContent="center">
                <TimeField
                  label="Uncontrolled field"
                  defaultValue={dayjs('2022-04-17T15:30')}
                />
                </Box>
              </Grid>          
              <Grid item xs = {6} >
                <Box display="flex" justifyContent='center'>
                  
                </Box>
              </Grid>

            <Grid item xs={12}>
              <Paper>
                <Typography>test3</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <FooterComponent></FooterComponent>
      </Box>
    </div>//end of container div
  )

}