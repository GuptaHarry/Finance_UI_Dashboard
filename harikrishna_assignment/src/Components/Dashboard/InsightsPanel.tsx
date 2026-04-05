import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import { generateInsights, getSpendingTrend, calculateSummary } from "../../Utils/Analytics";

export default function InsightsPanel() {
  const { transactions } = useTransactions();
  const { themeMode } = useUI();
  const insights = generateInsights(transactions);
  const trend = getSpendingTrend(transactions);
  const summary = calculateSummary(transactions);
  const isDark = themeMode === "dark";

  const TrendIcon =
    trend.trend === "up"
      ? TrendingUpIcon
      : trend.trend === "down"
      ? TrendingDownIcon
      : TrendingFlatIcon;

  const trendColor =
    trend.trend === "up" ? "#fb7185" : trend.trend === "down" ? "#22c55e" : "#94a3b8";

  // Calculate savings progress (target: save 30% of income)
  const savingsTarget = summary.income * 0.3;
  const actualSavings = summary.balance;
  const savingsProgress = savingsTarget > 0 ? Math.min((actualSavings / savingsTarget) * 100, 100) : 0;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: isDark
          ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 14, 27, 0.9))"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))",
        border: isDark
          ? "1px solid rgba(99, 102, 241, 0.18)"
          : "1px solid rgba(226, 232, 240, 1)",
        boxShadow: isDark
          ? "0 28px 68px rgba(7, 15, 32, 0.22)"
          : "0 10px 30px rgba(0, 0, 0, 0.04)",
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
        sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
      >
        Performance Insights
      </Typography>

      <Stack spacing={2} flex={1}>
        {/* Highest Expense Category */}
        <InsightCard
          title="Highest Expense Category"
          value={insights.highestCategory ?? "No data"}
          subtitle={insights.highestAmount ? `₹${insights.highestAmount.toLocaleString()}` : undefined}
          color="#ef4444"
          bgColor={isDark ? "rgba(239, 68, 68, 0.08)" : "rgba(239, 68, 68, 0.06)"}
          borderColor={isDark ? "rgba(239, 68, 68, 0.22)" : "rgba(239, 68, 68, 0.15)"}
          isDark={isDark}
        />

        {/* Average Daily Spend */}
        <InsightCard
          title="Average Daily Spend"
          value={`₹${Math.round(insights.avgDailySpend).toLocaleString()}`}
          subtitle={`Across ${transactions.filter((t) => t.type === "expense").length} expenses`}
          color="#14b8a6"
          bgColor={isDark ? "rgba(20, 184, 166, 0.08)" : "rgba(20, 184, 166, 0.06)"}
          borderColor={isDark ? "rgba(20, 184, 166, 0.18)" : "rgba(20, 184, 166, 0.15)"}
          isDark={isDark}
        />

        {/* Spending Trend */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: isDark ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.05)",
            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.22)" : "rgba(99, 102, 241, 0.15)"}`,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography
                fontSize={13}
                sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
                gutterBottom
              >
                Spending Trend
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <TrendIcon sx={{ color: trendColor, fontSize: 20 }} />
                <Typography fontWeight={600} fontSize={15} color={trendColor}>
                  {trend.trend === "up"
                    ? "Increasing"
                    : trend.trend === "down"
                    ? "Decreasing"
                    : "Stable"}
                </Typography>
              </Stack>
            </Box>
            <Typography fontWeight={700} fontSize={18} color={trendColor}>
              {trend.percentage.toFixed(1)}%
            </Typography>
          </Stack>
        </Box>

        {/* Savings Progress */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            background: isDark ? "rgba(34, 197, 94, 0.08)" : "rgba(34, 197, 94, 0.05)",
            border: `1px solid ${isDark ? "rgba(34, 197, 94, 0.18)" : "rgba(34, 197, 94, 0.15)"}`,
          }}
        >
          <Typography
            fontSize={13}
            sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
            gutterBottom
          >
            Savings Goal Progress (30% target)
          </Typography>
          <Stack spacing={1}>
            <LinearProgress
              variant="determinate"
              value={savingsProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: isDark ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.2)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  bgcolor: savingsProgress >= 100 ? "#22c55e" : "#14b8a6",
                },
              }}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography
                fontSize={12}
                sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
              >
                ₹{actualSavings.toLocaleString()} saved
              </Typography>
              <Typography
                fontSize={12}
                sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
              >
                {savingsProgress.toFixed(0)}% of target
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function InsightCard({
  title,
  value,
  subtitle,
  color,
  bgColor,
  borderColor,
  isDark,
}: {
  title: string;
  value: string;
  subtitle?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  isDark: boolean;
}) {
  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 3,
        background: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <Typography
        fontSize={13}
        sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
        gutterBottom
      >
        {title}
      </Typography>
      <Typography fontWeight={700} fontSize={17} color={color}>
        {value}
      </Typography>
      {subtitle && (
        <Typography
          fontSize={12}
          sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
          mt={0.5}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
