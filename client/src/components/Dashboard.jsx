import { Grid, useMediaQuery, useTheme } from "@mui/material";
import MapComponent from "./Leaflet";
import withVantaBackground from "./WithVantaBackground";
import { TypeAnimation } from "react-type-animation";
import Data from "./Data";
import SimpleLineChart from "./Graph";
import AccSimpleLineChart from "./AccGraph";
import "./scroll.css";

function Dashboard() {
  const initialSentences = [
    "Welcome to the dashboard",
    // 1000,
    // "Here you can see the live data",
    // 1000,
    // "You can also see the live video feed",
    // 1000,
    // "And the location of the vehicle",
    // 1000,
    // "Have a nice day",
    // 1000,
    // "Live Camera View from prototype",
    // 1000,
    // "GPS Position Feed",
  ];

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className="custom-scroll-container"
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "#1f1f1f",
        overflowX: "hidden",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TypeAnimation
        cursor={true}
        sequence={initialSentences}
        wrapper="h1"
        repeat
        repeatDelay={1000}
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Orbitron",
          fontWeight: "bold",
          margin: "50px",
          minHeight: "80px",
        }}
      />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{
          width: "90%",
          height: "90%",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <Grid item xs={isSmallScreen ? 12 : 6}>
          {/* <SimpleMap /> */}
          <MapComponent />
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6}>
          {/* <h1>hiii</h1> */}
          <img
            src="https://b76c-2409-4080-8303-f32c-35e7-bbea-7060-804b.ngrok-free.app/stream"
            height="390px"
            width="650px"
          ></img>
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6}>
          <AccSimpleLineChart />
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6} sx={{ pb: 5 }}>
          <SimpleLineChart />
          {/* <MapComponent /> */}
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6} sx={{ pb: 5 }}>
          <Data />
          {/* <SimpleMap /> */}
        </Grid>
      </Grid>
    </div>
  );
}

const DashboardWithBackground = withVantaBackground(Dashboard); // Wrapped Dashboard component with HOC
export default DashboardWithBackground; // Export wrapped component
