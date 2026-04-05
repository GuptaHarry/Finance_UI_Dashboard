import { Box, Stack, Typography } from "@mui/material";
import useTransactions from "../../Hooks/useTransactions";
import { generateInsights } from "../../Utils/Analytics";

export default function InsightsPanel() {
  const { transactions } = useTransactions();
  const { highestCategory, highestAmount } = generateInsights(transactions);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 14, 27, 0.9))",
        border: "1px solid rgba(99, 102, 241, 0.18)",
        boxShadow: "0 28px 68px rgba(7, 15, 32, 0.22)",
        minHeight: 340,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2} color="#eef2ff">
        Performance Insights
      </Typography>

      <Stack spacing={2}>
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.22)",
          }}
        >
          <Typography fontSize={14} color="#94a3b8" gutterBottom>
            Highest Expense Category
          </Typography>
          <Typography fontWeight={700} fontSize={18} color="#eef2ff">
            {highestCategory ?? "No expense data"}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: "rgba(20, 184, 166, 0.08)",
            border: "1px solid rgba(20, 184, 166, 0.18)",
          }}
        >
          <Typography fontSize={14} color="#94a3b8" gutterBottom>
            Highest Spend Amount
          </Typography>
          <Typography fontWeight={700} fontSize={18} color="#e2e8f0">
            {highestAmount ? `₹${highestAmount.toLocaleString()}` : "₹0"}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            background: "rgba(124, 58, 237, 0.08)",
            border: "1px solid rgba(124, 58, 237, 0.18)",
          }}
        >
          <Typography fontSize={14} color="#94a3b8" gutterBottom>
            Operational Signal
          </Typography>
          <Typography fontWeight={700} fontSize={18} color="#c7d2fe">
            Monitor weekly performance to maintain steady savings and spending discipline.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
