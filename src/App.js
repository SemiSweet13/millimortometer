import './App.css';
import { Box, Paper, Tooltip, Typography, Grid, AppBar } from '@mui/material';

function App() {
  return (
    <Paper elevation={3}>
      <div>
      <AppBar color='primary' position='static'>
              <Typography variant='body1' align='center'>MilliMortoMeter</Typography> 
      </AppBar>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <Box>
              
            </Box>
          </Grid>
        </Grid>
      </div>
    
    </Paper>
  );
}

export default App;
