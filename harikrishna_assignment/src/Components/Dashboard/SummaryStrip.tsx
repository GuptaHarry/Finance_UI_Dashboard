import { Box, Stack, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";
import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import { calculateSummary } from "../../Utils/Analytics";

export default function SummaryStrip() {
  const { transactions } = useTransactions();
  const { themeMode } = useUI();
  const summary = calculateSummary(transactions);
  const isDark = themeMode === "dark";

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 3,
        borderRadius: 4,
        background: isDark
          ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.82))"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))",
        border: isDark
          ? "1px solid rgba(99, 102, 241, 0.22)"
          : "1px solid rgba(226, 232, 240, 1)",
        boxShadow: isDark
          ? "0 30px 70px rgba(7, 15, 32, 0.24)"
          : "0 10px 30px rgba(0, 0, 0, 0.04)",
        transition: "all 0.3s ease",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        justifyContent="space-between"
        flexWrap="wrap"
        useFlexGap
      >
        <MetricCard
          label="Total Balance"
          value={summary.balance}
          icon={<AccountBalanceWalletIcon />}
          color={isDark ? "#f8fafc" : "#0f172a"}
          iconBg={isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)"}
          iconColor="#6366f1"
          isDark={isDark}
        />
        <MetricCard
          label="Income"
          value={summary.income}
          icon={<TrendingUpIcon />}
          color="#22c55e"
          iconBg="rgba(34, 197, 94, 0.15)"
          iconColor="#22c55e"
          isDark={isDark}
          positive
        />
        <MetricCard
          label="Expenses"
          value={summary.expenses}
          icon={<TrendingDownIcon />}
          color="#fb7185"
          iconBg="rgba(251, 113, 133, 0.15)"
          iconColor="#fb7185"
          isDark={isDark}
          negative
        />
        <MetricCard
          label="Savings Rate"
          value={`${summary.savingsRate.toFixed(1)}%`}
          icon={<SavingsIcon />}
          color={isDark ? "#14b8a6" : "#0d9488"}
          iconBg="rgba(20, 184, 166, 0.15)"
          iconColor="#14b8a6"
          isDark={isDark}
          isPercentage
        />
      </Stack>
    </Box>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
  iconBg,
  iconColor,
  isDark,
  positive,
  negative,
  isPercentage,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  iconBg: string;
  iconColor: string;
  isDark: boolean;
  positive?: boolean;
  negative?: boolean;
  isPercentage?: boolean;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        flex: { xs: "1 1 45%", md: 1 },
        minWidth: { xs: 140, sm: 160 },
        p: 2,
        borderRadius: 3,
        background: isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.8)",
        border: isDark ? "1px solid rgba(148, 163, 184, 0.08)" : "1px solid rgba(226, 232, 240, 0.6)",
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isDark ? "0 8px 24px rgba(0, 0, 0, 0.2)" : "0 8px 24px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </Box>
      <Stack spacing={0.25}>
        <Typography
          fontSize={12}
          fontWeight={500}
          sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          {label}
        </Typography>
        <Typography
          fontWeight={700}
          sx={{
            fontSize: { xs: 18, md: 22 },
            color: color,
          }}
        >
          {typeof value === "number"
            ? `₹${value.toLocaleString()}`
            : value}
        </Typography>
      </Stack>
    </Stack>
  );
}
