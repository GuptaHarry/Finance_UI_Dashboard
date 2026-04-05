import { Box, Stack, Typography, Grow } from "@mui/material";
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
        spacing={{ xs: 2, sm: 2, md: 3 }}
        justifyContent="space-between"
        flexWrap="wrap"
        useFlexGap
      >
        {cards.map((card, index) => (
          <Grow in timeout={300 + index * 100} key={card.label}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                flex: { xs: "1 1 45%", md: 1 },
                minWidth: { xs: 145, sm: 170 },
                p: 2.5,
                borderRadius: 3,
                background: card.gradient,
                border: isDark
                  ? "1px solid rgba(148, 163, 184, 0.08)"
                  : "1px solid rgba(226, 232, 240, 0.6)",
                transition: "all 0.25s ease",
                cursor: "default",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: isDark
                    ? `0 12px 32px rgba(0, 0, 0, 0.25), 0 0 0 1px ${card.iconColor}20`
                    : `0 12px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px ${card.iconColor}15`,
                  borderColor: `${card.iconColor}30`,
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: card.iconBg,
                  color: card.iconColor,
                  transition: "all 0.25s ease",
                  "& svg": {
                    fontSize: 24,
                  },
                }}
              >
                {card.icon}
              </Box>
              <Stack spacing={0.5}>
                <Typography
                  fontSize={12}
                  fontWeight={500}
                  letterSpacing={0.3}
                  sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
                >
                  {card.label}
                </Typography>
                <Typography
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: 20, md: 24 },
                    color: card.color,
                    letterSpacing: -0.5,
                  }}
                >
                  {typeof card.value === "number"
                    ? `₹${card.value.toLocaleString()}`
                    : card.value}
                </Typography>
              </Stack>
            </Stack>
          </Grow>
        ))}
      </Stack>
    </Box>
  );
}
