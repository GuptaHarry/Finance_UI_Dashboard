import { Box, Container, Stack , MenuItem , TextField} from "@mui/material";
import SummaryStrip from "../Components/Dashboard/SummaryStrip";
import TrendChart from "../Components/Dashboard/TrendChart";
import InsightsPanel from "../Components/Dashboard/InsightsPanel";
import CategoryBreakdown from "../Components/Dashboard/CategoryBreakdown";
import TransactionsTable from "../Components/Transactions/TransactionTable";
import useUI from "../Hooks/useUI";
import { type Role } from "../Context/UIContext";
export default function DashboardPage() {
  const { role , setRole } = useUI();
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="xl">

        <TextField
        select
        size="small"
        value={role}
        onChange={(e)=>setRole(e.target.value as Role)}>
          <MenuItem value="viewer"></MenuItem>
          <MenuItem value="admin"></MenuItem>
        </TextField>
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
        </Stack>
        <Stack spacing={3}>
            <CategoryBreakdown/>
            <TransactionsTable/>
        </Stack>
      </Container>
    </Box>
  );
}