import { Grid, useMediaQuery, useTheme } from "@mui/material";
import SimpleMap from "./GoogleMap"; // Import your GoogleMap component
import VideoPlayer from "./videoPlayer";
import Data from "./Data";

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={2}
    >
      {isSmallScreen ? (
        // For smaller screens (4x1 layout)
        <>
          <Grid item xs={12}>
            <SimpleMap />
          </Grid>
          <Grid item xs={12}>
            {/* {/* <SimpleMap /> */}
            <VideoPlayer /> */}
            {/* <DashboardComponent title="Component 2" /> */}
          </Grid>
          <Grid item xs={12}>
            {/* <SimpleMap /> */}
            <Data />
            {/* <DashboardComponent title="Component 3" /> */}
          </Grid>
          <Grid item xs={12}>
            {/* <SimpleMap /> */}
            {/* <DashboardComponent title="Component 4" /> */}
          </Grid>
        </>
      ) : (
        // For larger screens (2x2 layout)
        <>
          <Grid item xs={6}>
            <SimpleMap />
          </Grid>
          <Grid item xs={6}>
            {/* {/* <SimpleMap /> */}
            <VideoPlayer /> */}
            {/* <DashboardComponent title="Component 2" /> */}
          </Grid>
          <Grid item xs={6}>
            {/* <SimpleMap /> */}
            <Data />
            {/* <DashboardComponent title="Component 3" /> */}
          </Grid>
          <Grid item xs={6}>
            {/* <SimpleMap /> */}
            {/* <DashboardComponent title="Component 4" /> */}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default Dashboard;
