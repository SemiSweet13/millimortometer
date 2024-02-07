import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  top: 'auto',
  bottom: 0,
  zIndex: 9999 //so footer overwirtes drawer 
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
}));

function FooterComponent() {
  return (
    <StyledAppBar position="fixed" color="primary">
      <Toolbar>
        <StyledTypography variant="body1" color="inherit">
          © 2024 MilliMortoMeter | Jack Malone | Charles Markham
        </StyledTypography>
      </Toolbar>
    </StyledAppBar>
  );
}

export default FooterComponent;