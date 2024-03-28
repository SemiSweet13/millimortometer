import React from "react";
import { Drawer, ListItem, ListItemIcon, ListItemText, Box, Toolbar, List } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from 'react-router-dom';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';


const DrawerComponent = () => {
  const data = [
    { name: "Home", icon: HomeOutlined, path: "/Home"},
    { name: "Risk", icon: CrisisAlertIcon, path: "/Risk" },
  ];
  //{ name: "Map", icon: ExploreIcon, path: "/Map" },
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 1 / 4,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 1 / 4, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      {/* fix list item height in cleanup */}
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100' }}>
        <List>
          {data.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={NavLink} to={item.path} activeClassName="Mui-selected" exact>
                <ListItemIcon>
                  {/* Render the icon component */}
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default DrawerComponent