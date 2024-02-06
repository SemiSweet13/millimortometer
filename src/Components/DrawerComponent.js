import { Drawer,ListItem,ListItemIcon, ListItemText, Button, List} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ExploreIcon  from "@mui/icons-material/HomeOutlined";
import CrisisAlertIcon from "@mui/icons-material/HomeOutlined";
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from "@mui/icons-material/Menu";
import makeStyles from "@mui/system";
import { useState } from "react";

const data = [
    { name: "Home", icon: <HomeOutlined />,},
    { name: "Map", icon: <ExploreIcon /> },
    { name: "Risk", icon: <CrisisAlertIcon /> },
  ];

export const DrawerComponent = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setIsOpen(open);
    };

    const list = () => (
      <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {/* Add ListItem and ListItemIcon for each menu item */}
          <ListItem button key="Item1">
            <ListItemIcon>{/* Icon for Item1 */}</ListItemIcon>
            <ListItemText primary="Item1" />
          </ListItem>
          {/* Repeat for other items */}
        </List>
      </div>
    );

    return (
        <div>
        <AppsIcon
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </AppsIcon>
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
      );

}
export default DrawerComponent