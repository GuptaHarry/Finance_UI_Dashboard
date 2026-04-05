import { Box, Stack, Typography } from "@mui/material";
import useTransactions from "../../Hooks/useTransactions";
import { calculateSummary } from "../../Utils/Analytics";

export default function SummaryStrip() {
  const { transactions } = useTransactions();
  const summary = calculateSummary(transactions);

  const cards = [
    {
      label: "Total Balance",
      value: summary.balance,
      icon: <AccountBalanceWalletIcon />,
      color: isDark ? "#f8fafc" : "#0f172a",
      iconBg: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
      iconColor: "#6366f1",
      gradient: isDark
        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.04))"
        : "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.02))",
    },
    {
      label: "Income",
      value: summary.income,
      icon: <TrendingUpIcon />,
      color: "#22c55e",
      iconBg: "rgba(34, 197, 94, 0.15)",
      iconColor: "#22c55e",
      gradient: isDark
        ? "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(20, 184, 166, 0.04))"
        : "linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(20, 184, 166, 0.02))",
      positive: true,
    },
    {
      label: "Expenses",
      value: summary.expenses,
      icon: <TrendingDownIcon />,
      color: "#fb7185",
      iconBg: "rgba(251, 113, 133, 0.15)",
      iconColor: "#fb7185",
      gradient: isDark
        ? "linear-gradient(135deg, rgba(251, 113, 133, 0.08), rgba(239, 68, 68, 0.04))"
        : "linear-gradient(135deg, rgba(251, 113, 133, 0.05), rgba(239, 68, 68, 0.02))",
      negative: true,
    },
    {
      label: "Savings Rate",
      value: `${summary.savingsRate.toFixed(1)}%`,
      icon: <SavingsIcon />,
      color: isDark ? "#14b8a6" : "#0d9488",
      iconBg: "rgba(20, 184, 166, 0.15)",
      iconColor: "#14b8a6",
      gradient: isDark
        ? "linear-gradient(135deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.04))"
        : "linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(6, 182, 212, 0.02))",
      isPercentage: true,
    },
  ];

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
