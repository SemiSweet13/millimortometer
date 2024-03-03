import React from "react";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Modal, Box, Typography } from "@mui/material";


//this component is a popup modal which will be used to alert user of any errors on input mistakes

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 5,
    p: 3,
}
const CustomAlert = ({msg, title }) => {

    const [open, setOpen] = React.useState(true);    
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <Alert severity="error">
                        <AlertTitle>{title}</AlertTitle>
                        {msg}
                    </Alert>
                </Box>
            </Modal>
        </div>
    )

}

export default CustomAlert