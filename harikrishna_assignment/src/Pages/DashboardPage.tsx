import {
  Box,
  Container,
  Stack,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SummaryStrip from "../Components/Dashboard/SummaryStrip";
import TrendChart from "../Components/Dashboard/TrendChart";
import InsightsPanel from "../Components/Dashboard/InsightsPanel";
import CategoryBreakdown from "../Components/Dashboard/CategoryBreakdown";
import TransactionsTable from "../Components/Transactions/TransactionTable";
import useUI from "../Hooks/useUI";
import { type Role } from "../Context/UIContext";

export default function DashboardPage() {
  const { role, setRole } = useUI();

  return (
    <Box sx={{ py: { xs: 3, md: 6 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 4,
            background: "rgba(15, 23, 42, 0.92)",
            border: "1px solid rgba(99, 102, 241, 0.18)",
            boxShadow: "0 40px 90px rgba(7, 15, 32, 0.32)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Box>
              <Typography variant="h3" fontWeight={800} gutterBottom>
                Finance Performance Dashboard
              </Typography>
              <Typography variant="body1" sx={{ color: "#94a3b8", maxWidth: 720 }}>
                A polished executive dashboard designed to present spending, balance performance, and financial trends with clarity.
              </Typography>
            </Box>

            <TextField
              select
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              sx={{
                width: 210,
                bgcolor: "rgba(15, 23, 42, 0.85)",
                borderRadius: 3,
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(148, 163, 184, 0.22)",
                },
                input: {
                  color: "#e2e8f0",
                },
              }}
            >
              <MenuItem value="viewer">Viewer Mode</MenuItem>
              <MenuItem value="admin">Admin Mode</MenuItem>
            </TextField>
          </Stack>
        </Box>

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
      </Container>
    </Box>
  );
}
