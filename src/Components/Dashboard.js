import React from "react";
import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography, Grid, Paper, Box } from "@mui/material";
import List from '@mui/material/List';
import { Drawer, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import { useState } from "react";
import FooterComponent from "./Footer";

//drawer data
const data = [
  { name: "Home", icon: HomeOutlined },
  { name: "Map", icon: ExploreIcon },
  { name: "Risk", icon: CrisisAlertIcon },
];
const drawerWidth = 240;
//component called in index.js
export default function Dashboard() {
  //useStates needed for the dashboard
  const [open, setOpen] = React.useState(false)

  //elements to be rendered
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar >
            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
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
        </Box>
        <FooterComponent></FooterComponent>
      </Box>
    </div>//end of container div
  )

}