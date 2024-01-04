// import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import DashboardComponent from './DashboardComponent'; // Import your Dashboard components

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={2}>
      {isSmallScreen ? (
        // For smaller screens (4x1 layout)
        <>
          <Grid item xs={12}>
            <DashboardComponent title="Component 1" />
          </Grid>
          <Grid item xs={12}>
            <DashboardComponent title="Component 2" />
          </Grid>
          <Grid item xs={12}>
            <DashboardComponent title="Component 3" />
          </Grid>
          <Grid item xs={12}>
            <DashboardComponent title="Component 4" />
          </Grid>
        </>
      ) : (
        // For larger screens (2x2 layout)
        <>
          <Grid item xs={6}>
            <DashboardComponent title="Component 1" />
          </Grid>
          <Grid item xs={6}>
            <DashboardComponent title="Component 2" />
          </Grid>
          <Grid item xs={6}>
            <DashboardComponent title="Component 3" />
          </Grid>
          <Grid item xs={6}>
            <DashboardComponent title="Component 4" />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Dashboard;
