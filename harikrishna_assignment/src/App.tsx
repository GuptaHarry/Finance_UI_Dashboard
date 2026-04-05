import { ThemeProvider, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import DashboardPage from "./Pages/DashboardPage";
import { getTheme } from "./Theme/theme";
import useUI from "./Hooks/useUI";

function AppContent() {
  const { themeMode } = useUI();

  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardPage />
    </ThemeProvider>
  );
}

export default function App() {
  return <AppContent />;
}
