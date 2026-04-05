import { createTheme, type PaletteMode } from "@mui/material/styles";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // Dark mode palette
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
          }
        : {
            // Light mode palette
            primary: {
              main: "#6366f1",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#14b8a6",
              contrastText: "#ffffff",
            },
            info: {
              main: "#0ea5e9",
            },
            success: {
              main: "#22c55e",
            },
            error: {
              main: "#ef4444",
            },
            background: {
              default: "#f8fafc",
              paper: "#ffffff",
            },
            text: {
              primary: "#0f172a",
              secondary: "#64748b",
            },
          }),
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
        color: mode === "dark" ? "#cbd5e1" : "#475569",
      },
      body2: {
        color: mode === "dark" ? "#94a3b8" : "#64748b",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            minHeight: "100vh",
            background:
              mode === "dark"
                ? "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(124,58,237,0.2), transparent 25%), #050814"
                : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            color: mode === "dark" ? "#eef2ff" : "#0f172a",
            fontSmooth: "always",
            textRendering: "optimizeLegibility",
            transition: "background 0.3s ease, color 0.3s ease",
          },
          "*": {
            boxSizing: "border-box",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });

// Export default dark theme for backward compatibility
const theme = getTheme("dark");
export default theme;
