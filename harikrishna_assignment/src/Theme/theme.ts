import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c3aed",
      contrastText: "#eef2ff",
    },
    secondary: {
      main: "#14b8a6",
      contrastText: "#0f172a",
    },
    info: {
      main: "#38bdf8",
    },
    success: {
      main: "#22c55e",
    },
    error: {
      main: "#f97316",
    },
    background: {
      default: "#060b17",
      paper: "rgba(15, 23, 42, 0.95)",
    },
    text: {
      primary: "#eef2ff",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.06em",
    },
    h2: {
      fontWeight: 700,
    },
    body1: {
      color: "#cbd5e1",
    },
    body2: {
      color: "#94a3b8",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          minHeight: "100vh",
          background: "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(124,58,237,0.2), transparent 25%), #050814",
          color: "#eef2ff",
          fontSmooth: "always",
          textRendering: "optimizeLegibility",
        },
        "*": {
          boxSizing: "border-box",
        },
      },
    },
  },
});

export default theme;
