import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Dashboard from "./components/Dashboard";

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
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </div>
  );
}

export default App;
