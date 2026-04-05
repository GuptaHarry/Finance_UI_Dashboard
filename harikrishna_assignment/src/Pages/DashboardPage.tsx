import {
  Box,
  Container,
  Stack,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SummaryStrip from "../Components/Dashboard/SummaryStrip";
import TrendChart from "../Components/Dashboard/TrendChart";
import InsightsPanel from "../Components/Dashboard/InsightsPanel";
import CategoryBreakdown from "../Components/Dashboard/CategoryBreakdown";
import TransactionsTable from "../Components/Transactions/TransactionTable";
import useUI from "../Hooks/useUI";
import { type Role } from "../Context/UIContext";

export default function DashboardPage() {
  const { role, setRole, themeMode, toggleTheme } = useUI();
  const isDark = themeMode === "dark";

  return (
    <Box sx={{ py: { xs: 3, md: 6 }, minHeight: "100vh" }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 4,
            background: isDark
              ? "rgba(15, 23, 42, 0.92)"
              : "rgba(255, 255, 255, 0.95)",
            border: isDark
              ? "1px solid rgba(99, 102, 241, 0.18)"
              : "1px solid rgba(226, 232, 240, 1)",
            boxShadow: isDark
              ? "0 40px 90px rgba(7, 15, 32, 0.32)"
              : "0 20px 40px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s ease",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={3}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                <Typography
                  variant="h3"
                  fontWeight={800}
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2.25rem" },
                    color: isDark ? "#f8fafc" : "#0f172a",
                  }}
                >
                  Finance Dashboard
                </Typography>
                <Chip
                  label={role === "admin" ? "Admin" : "Viewer"}
                  size="small"
                  sx={{
                    bgcolor: role === "admin" ? "rgba(99, 102, 241, 0.15)" : "rgba(20, 184, 166, 0.15)",
                    color: role === "admin" ? "#a5b4fc" : "#14b8a6",
                    fontWeight: 600,
                  }}
                />
              </Stack>
              <Typography
                variant="body1"
                sx={{
                  color: isDark ? "#94a3b8" : "#64748b",
                  maxWidth: 720,
                }}
              >
                Track your spending, monitor balance trends, and gain insights into your financial performance.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
              {/* Theme Toggle */}
              <Tooltip title={`Switch to ${isDark ? "light" : "dark"} mode`}>
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    bgcolor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.08)",
                    color: isDark ? "#a5b4fc" : "#6366f1",
                    "&:hover": {
                      bgcolor: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.15)",
                    },
                  }}
                >
                  {isDark ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>

              {/* Role Selector */}
              <TextField
                select
                size="small"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                sx={{
                  width: 180,
                  bgcolor: isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(241, 245, 249, 0.9)",
                  borderRadius: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: isDark ? "rgba(148, 163, 184, 0.22)" : "rgba(203, 213, 225, 0.8)",
                  },
                  "& .MuiSelect-select": {
                    color: isDark ? "#e2e8f0" : "#334155",
                  },
                }}
              >
                <MenuItem value="viewer">Viewer Mode</MenuItem>
                <MenuItem value="admin">Admin Mode</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </Box>

        {/* Dashboard Content */}
        <Stack spacing={4}>
          <SummaryStrip />

          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            alignItems="stretch"
          >
            <Box sx={{ flex: 3 }}>
              <TrendChart />
            </Box>
            <Box sx={{ flex: 1 }}>
              <InsightsPanel />
            </Box>
          </Stack>

          <CategoryBreakdown />
          <TransactionsTable />
        </Stack>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography
            fontSize={13}
            sx={{ color: isDark ? "#475569" : "#94a3b8" }}
          >
            Finance Dashboard - Built by Harikrishna Gupta
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
