import {
  Grid,
  useMediaQuery,
  useTheme,
  Modal,
  Box,
} from "@mui/material";
import SimpleMap from "./GoogleMap";
import VideoPlayer from "./videoPlayer";
import withVantaBackground from "./WithVantaBackground";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "70%",
  maxWidth: 800,
  maxHeight: 600,
  minWidth: 300,
  minHeight: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div
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
        sequence={[
          "Welcome to the dashboard",
          1000,
          "Here you can see the live data",
          1000,
          "You can also see the live video feed",
          1000,
          "And the location of the vehicle",
          1000,
          "Have a nice day",
          1000,
        ]}
        wrapper="h1"
        repeat
        repeatDelay={1000}
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "50px",
          fontFamily: "Roboto",
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
        <Grid item xs={isSmallScreen ? 12 : 6} onClick={handleOpen}>
          <SimpleMap />
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6} onClick={handleOpen}>
          <SimpleMap />
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6} onClick={handleOpen}>
          <SimpleMap />
        </Grid>
        <Grid item xs={isSmallScreen ? 12 : 6} onClick={handleOpen}>
          <SimpleMap />
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        <SimpleMap /> 
        </Box>
      </Modal>
    </div>
  );
}

const DashboardWithBackground = withVantaBackground(Dashboard); // Wrapped Dashboard component with HOC

export default DashboardWithBackground; // Export wrapped component
