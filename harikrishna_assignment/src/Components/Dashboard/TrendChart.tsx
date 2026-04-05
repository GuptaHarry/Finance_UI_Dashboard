import { Box, Typography, Stack, Chip } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import { dailyTrend, calculateSummary } from "../../Utils/Analytics";

export default function TrendChart() {
  const { transactions } = useTransactions();
  const { themeMode } = useUI();
  const data = dailyTrend(transactions);
  const summary = calculateSummary(transactions);
  const isDark = themeMode === "dark";

  // Calculate trend direction
  const trendUp = data.length > 1 && data[data.length - 1].value > data[0].value;

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: isDark
          ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 14, 27, 0.95))"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))",
        border: isDark
          ? "1px solid rgba(99, 102, 241, 0.2)"
          : "1px solid rgba(226, 232, 240, 1)",
        boxShadow: isDark
          ? "0 28px 68px rgba(7, 15, 32, 0.22)"
          : "0 10px 30px rgba(0, 0, 0, 0.04)",
        height: 340,
        transition: "all 0.3s ease",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            fontWeight="bold"
            sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
          >
            Balance Trend
          </Typography>
          <Chip
            label={trendUp ? "Positive" : "Negative"}
            size="small"
            sx={{
              bgcolor: trendUp ? "rgba(34, 197, 94, 0.15)" : "rgba(251, 113, 133, 0.15)",
              color: trendUp ? "#22c55e" : "#fb7185",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        </Stack>
        <Typography
          fontSize={13}
          sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
        >
          Current: ₹{summary.balance.toLocaleString()}
        </Typography>
      </Stack>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDark ? "#8b5cf6" : "#6366f1"}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={isDark ? "#8b5cf6" : "#6366f1"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "rgba(148, 163, 184, 0.08)" : "rgba(203, 213, 225, 0.5)"}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke={isDark ? "#64748b" : "#94a3b8"}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              stroke={isDark ? "#64748b" : "#94a3b8"}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
              width={50}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? "#0f172a" : "#ffffff",
                border: isDark
                  ? "1px solid rgba(148, 163, 184, 0.18)"
                  : "1px solid rgba(226, 232, 240, 1)",
                borderRadius: 12,
                boxShadow: isDark
                  ? "0 8px 24px rgba(0, 0, 0, 0.3)"
                  : "0 8px 24px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: isDark ? "#94a3b8" : "#64748b" }}
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Balance"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isDark ? "#8b5cf6" : "#6366f1"}
              strokeWidth={3}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{
                r: 6,
                fill: isDark ? "#8b5cf6" : "#6366f1",
                stroke: isDark ? "#0f172a" : "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Box
          sx={{
            height: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px dashed ${isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.5)"}`,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
            No transaction data available
          </Typography>
        </Box>
      )}
    </Box>
  );
}
