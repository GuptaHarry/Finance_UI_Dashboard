import { ThemeProvider, CssBaseline } from "@mui/material";
import DashboardPage from "./Pages/DashboardPage";
import theme from "./Theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardPage />
    </ThemeProvider>
  );
}

export default App;
