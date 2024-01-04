import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Dashboard from "./Dashboard";
import GoogleMap from './components/GoogleMap';

function App() {
  // Create a custom Material-UI theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2196f3", // Change primary color
      },
      secondary: {
        main: "#f50057", // Change secondary color
      },
      // You can customize other palette properties like error, warning, info, etc.
    },
    typography: {
      fontFamily: "Arial, sans-serif", // Change default font family
    },
    // Other customizations like spacing, breakpoints, overrides, etc. can be added here
  });

  return (
    <div style={{height:'100%', display:'flex', border:'1px solid yellow'}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <h1>Rover DashBoard</h1>
      <Dashboard />
        <GoogleMap />
        {/* Your other components go here */}
      </ThemeProvider>
    </div>
  );
}

export default App;
