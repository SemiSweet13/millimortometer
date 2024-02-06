import { Drawer,ListItem,ListItemIcon, ListItemText, Button} from "@mui/material";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ExploreIcon  from "@mui/icons-material/HomeOutlined";
import CrisisAlertIcon from "@mui/icons-material/HomeOutlined";
import { useState } from "react";

const data = [
    { name: "Home", icon: <HomeOutlined />,},
    { name: "Map", icon: <ExploreIcon /> },
    { name: "Risk", icon: <CrisisAlertIcon /> },
  ];

export const DrawerPermanent = () => {
    const [open, setOpen] = useState(false);
    const getList = () => (
      <div style={{ width: 250 }} onClick={() => setOpen(false)}>
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
          <Button onClick={() => setOpen(true)}>Click me</Button>
          <Drawer variant="temporary" open={open} anchor={"left"} onClose={() => setOpen(false)}>
            {getList()}
          </Drawer>
        </div>
      );

}