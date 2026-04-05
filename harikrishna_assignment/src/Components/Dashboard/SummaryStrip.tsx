import { Box, Stack, Typography } from "@mui/material";
import useTransactions from "../../Hooks/useTransactions";
import { calculateSummary } from "../../Utils/Analytics";

export default function SummaryStrip() {
  const { transactions } = useTransactions();
  const summary = calculateSummary(transactions);

  return (
    <Box
      sx={{
        px: 4,
        py: 3,
        borderRadius: 4,
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.82))",
        border: "1px solid rgba(99, 102, 241, 0.22)",
        boxShadow: "0 30px 70px rgba(7, 15, 32, 0.24)",
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
          fontSize: 22,
          color: positive
            ? "#22c55e"
            : negative
            ? "#fb7185"
            : "#f8fafc",
        }}
      >
        {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
      </Typography>
    </Stack>
  );
}
