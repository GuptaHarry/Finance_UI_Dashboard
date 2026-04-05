import { useState } from "react";
import { Box, Typography, Stack, Chip, ToggleButtonGroup, ToggleButton } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import { dailyTrend, calculateSummary } from "../../Utils/Analytics";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <Box
        sx={{
          background: isDark
            ? "rgba(15, 23, 42, 0.95)"
            : "rgba(255, 255, 255, 0.98)",
          border: isDark
            ? "1px solid rgba(148, 163, 184, 0.2)"
            : "1px solid rgba(226, 232, 240, 1)",
          borderRadius: 3,
          boxShadow: isDark
            ? "0 12px 40px rgba(0, 0, 0, 0.4)"
            : "0 12px 40px rgba(0, 0, 0, 0.12)",
          p: 2,
          minWidth: 140,
        }}
      >
        <Typography
          fontSize={12}
          sx={{ color: isDark ? "#94a3b8" : "#64748b", mb: 0.5 }}
        >
          {label}
        </Typography>
        <Typography
          fontSize={18}
          fontWeight={700}
          sx={{ color: isDark ? "#f8fafc" : "#0f172a" }}
        >
          ₹{value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function TrendChart() {
  const { transactions } = useTransactions();
  const { themeMode } = useUI();
  const data = dailyTrend(transactions);
  const summary = calculateSummary(transactions);
  const isDark = themeMode === "dark";
  const [timeRange, setTimeRange] = useState<"7d" | "14d" | "30d">("30d");

  // Filter data based on time range
  const filterData = () => {
    const days = timeRange === "7d" ? 7 : timeRange === "14d" ? 14 : 30;
    return data.slice(-days);
  };

  const filteredData = filterData();

  // Calculate trend direction and percentage
  const trendUp =
    filteredData.length > 1 &&
    filteredData[filteredData.length - 1].value > filteredData[0].value;
  
  const trendPercentage =
    filteredData.length > 1 && filteredData[0].value > 0
      ? (
          ((filteredData[filteredData.length - 1].value - filteredData[0].value) /
            filteredData[0].value) *
          100
        ).toFixed(1)
      : "0";

  // Calculate average balance
  const avgBalance =
    filteredData.length > 0
      ? filteredData.reduce((sum, d) => sum + d.value, 0) / filteredData.length
      : 0;

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3.5 },
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
        height: { xs: 380, md: 400 },
        transition: "all 0.3s ease",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
          >
            Balance Trend
          </Typography>
          <Chip
            icon={
              trendUp ? (
                <TrendingUpIcon sx={{ fontSize: 16 }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16 }} />
              )
            }
            label={`${trendUp ? "+" : ""}${trendPercentage}%`}
            size="small"
            sx={{
              bgcolor: trendUp
                ? "rgba(34, 197, 94, 0.15)"
                : "rgba(251, 113, 133, 0.15)",
              color: trendUp ? "#22c55e" : "#fb7185",
              fontSize: 12,
              fontWeight: 600,
              "& .MuiChip-icon": {
                color: trendUp ? "#22c55e" : "#fb7185",
              },
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={(_, val) => val && setTimeRange(val)}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                border: isDark
                  ? "1px solid rgba(148, 163, 184, 0.15)"
                  : "1px solid rgba(203, 213, 225, 0.8)",
                color: isDark ? "#64748b" : "#94a3b8",
                px: 1.5,
                py: 0.5,
                fontSize: 12,
                "&.Mui-selected": {
                  bgcolor: isDark
                    ? "rgba(99, 102, 241, 0.15)"
                    : "rgba(99, 102, 241, 0.1)",
                  color: isDark ? "#a5b4fc" : "#6366f1",
                  borderColor: isDark
                    ? "rgba(99, 102, 241, 0.3)"
                    : "rgba(99, 102, 241, 0.4)",
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(99, 102, 241, 0.2)"
                      : "rgba(99, 102, 241, 0.15)",
                  },
                },
              },
            }}
          >
            <ToggleButton value="7d">7D</ToggleButton>
            <ToggleButton value="14d">14D</ToggleButton>
            <ToggleButton value="30d">30D</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      {/* Stats row */}
      <Stack direction="row" spacing={4} mb={2}>
        <Box>
          <Typography
            fontSize={12}
            sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
          >
            Current Balance
          </Typography>
          <Typography
            fontSize={20}
            fontWeight={700}
            sx={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            ₹{summary.balance.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <Typography
            fontSize={12}
            sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
          >
            Average
          </Typography>
          <Typography
            fontSize={20}
            fontWeight={700}
            sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            ₹{avgBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </Typography>
        </Box>
      </Stack>

      {filteredData.length > 0 ? (
        <ResponsiveContainer width="100%" height="70%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isDark ? "#8b5cf6" : "#6366f1"}
                  stopOpacity={0.35}
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
              stroke={
                isDark ? "rgba(148, 163, 184, 0.06)" : "rgba(203, 213, 225, 0.4)"
              }
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke={isDark ? "#64748b" : "#94a3b8"}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={10}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke={isDark ? "#64748b" : "#94a3b8"}
              tick={{ fill: isDark ? "#64748b" : "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`
              }
              width={55}
            />
            <ReferenceLine
              y={avgBalance}
              stroke={isDark ? "#6366f1" : "#a5b4fc"}
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <Tooltip content={<CustomTooltip isDark={isDark} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isDark ? "#8b5cf6" : "#6366f1"}
              strokeWidth={2.5}
              fill="url(#colorValue)"
              dot={false}
              activeDot={{
                r: 7,
                fill: isDark ? "#8b5cf6" : "#6366f1",
                stroke: isDark ? "#0f172a" : "#ffffff",
                strokeWidth: 3,
                style: {
                  filter: "drop-shadow(0 2px 8px rgba(99, 102, 241, 0.4))",
                },
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Box
          sx={{
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px dashed ${
              isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.5)"
            }`,
            borderRadius: 3,
          }}
        >
          <Stack alignItems="center" spacing={1}>
            <Typography sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
              No transaction data available
            </Typography>
            <Typography
              fontSize={13}
              sx={{ color: isDark ? "#475569" : "#cbd5e1" }}
            >
              Add transactions to see your balance trend
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
