import { Box, Stack, Typography } from "@mui/material";
import {useTransactions}from "../../Context/TransactionsContext";
import { calculateSummary } from "../../utils/analytics";

export default function SummaryStrip() {
  const { transactions } = useTransactions();
  const summary = calculateSummary(transactions);

  return (
    <Box
      sx={{
        px: 3,
        py: 2,
        borderRadius: 3,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        justifyContent="space-between"
      >
        <Metric label="Balance" value={summary.balance} />
        <Metric label="Income" value={summary.income} positive />
        <Metric label="Expenses" value={summary.expenses} negative />
        <Metric
          label="Savings Rate"
          value={`${summary.savingsRate.toFixed(1)}%`}
        />
      </Stack>
    </Box>
  );
}

function Metric({
  label,
  value,
  positive,
  negative,
}: {
  label: string;
  value: number | string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <Stack spacing={0.5}>
      <Typography fontSize={13} color="text.secondary">
        {label}
      </Typography>

      <Typography
        fontWeight="bold"
        sx={{
          fontSize: 20,
          color: positive
            ? "#22c55e"
            : negative
            ? "#ef4444"
            : "#0f172a",
        }}
      >
        {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
      </Typography>
    </Stack>
  );
}