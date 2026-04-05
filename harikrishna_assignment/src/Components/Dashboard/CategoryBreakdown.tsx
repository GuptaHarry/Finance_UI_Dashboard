import { useState } from "react";
import { Box, Stack, Typography, Chip, Fade, Paper } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Sector,
} from "recharts";
import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import { categoryBreakdown, calculateSummary } from "../../Utils/Analytics";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const COLORS: Record<string, string> = {
  Salary: "#22c55e",
  Freelance: "#14b8a6",
  Food: "#f97316",
  Bills: "#ef4444",
  Entertainment: "#a855f7",
  Health: "#ec4899",
  Transport: "#3b82f6",
  Shopping: "#f59e0b",
  Investment: "#06b6d4",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any, isDark: boolean) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 12}
        dy={0}
        textAnchor="middle"
        fill={isDark ? "#e2e8f0" : "#334155"}
        fontSize={16}
        fontWeight={700}
      >
        {payload.category}
      </text>
      <text
        x={cx}
        y={cy + 10}
        dy={8}
        textAnchor="middle"
        fill={isDark ? "#94a3b8" : "#64748b"}
        fontSize={13}
      >
        {`₹${value.toLocaleString()}`}
      </text>
      <text
        x={cx}
        y={cy + 32}
        dy={8}
        textAnchor="middle"
        fill={isDark ? "#64748b" : "#94a3b8"}
        fontSize={11}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        opacity={0.4}
      />
    </g>
  );
};

export default function CategoryBreakdown() {
  const { transactions } = useTransactions();
  const { themeMode } = useUI();
  const data = categoryBreakdown(transactions);
  const summary = calculateSummary(transactions);
  const isDark = themeMode === "dark";
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const totalExpenses = summary.expenses;

  const topCategory = sortedData[0];
  const lowestCategory = sortedData[sortedData.length - 1];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
    setHoveredCategory(sortedData[index]?.category || null);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
    setHoveredCategory(null);
  };

  const handleCategoryHover = (category: string | null) => {
    if (category) {
      const index = sortedData.findIndex((d) => d.category === category);
      setActiveIndex(index >= 0 ? index : undefined);
      setHoveredCategory(category);
    } else {
      setActiveIndex(undefined);
      setHoveredCategory(null);
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 4,
        background: isDark
          ? "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 14, 27, 0.92))"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95))",
        border: isDark
          ? "1px solid rgba(99, 102, 241, 0.18)"
          : "1px solid rgba(226, 232, 240, 1)",
        boxShadow: isDark
          ? "0 28px 68px rgba(7, 15, 32, 0.22)"
          : "0 10px 30px rgba(0, 0, 0, 0.04)",
        transition: "all 0.3s ease",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
          >
            Spending Breakdown
          </Typography>
          <Chip
            label={`${data.length} categories`}
            size="small"
            sx={{
              bgcolor: isDark
                ? "rgba(99, 102, 241, 0.15)"
                : "rgba(99, 102, 241, 0.1)",
              color: isDark ? "#a5b4fc" : "#6366f1",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        </Stack>

        {totalExpenses > 0 && (
          <Typography
            fontSize={14}
            fontWeight={600}
            sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
          >
            Total: ₹{totalExpenses.toLocaleString()}
          </Typography>
        )}
      </Stack>

      {data.length > 0 ? (
        <Stack spacing={3}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={4}
            alignItems="flex-start"
          >
            {/* PIE CHART */}
            <Box
              sx={{
                width: { xs: "100%", lg: 300 },
                height: { xs: 280, lg: 300 },
                mx: { xs: "auto", lg: 0 },
              }}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sortedData}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    activeIndex={activeIndex}
                    activeShape={(props: unknown) =>
                      renderActiveShape(props, isDark)
                    }
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    style={{ cursor: "pointer", outline: "none" }}
                  >
                    {sortedData.map((entry) => (
                      <Cell
                        key={entry.category}
                        fill={COLORS[entry.category] || "#6366f1"}
                        stroke={isDark ? "#0f172a" : "#ffffff"}
                        strokeWidth={2}
                        style={{
                          transition: "all 0.3s ease",
                          opacity:
                            hoveredCategory &&
                            hoveredCategory !== entry.category
                              ? 0.4
                              : 1,
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: isDark
                        ? "rgba(15, 23, 42, 0.95)"
                        : "rgba(255, 255, 255, 0.98)",
                      border: isDark
                        ? "1px solid rgba(148, 163, 184, 0.2)"
                        : "1px solid rgba(226, 232, 240, 1)",
                      borderRadius: 12,
                      boxShadow: isDark
                        ? "0 10px 40px rgba(0,0,0,0.4)"
                        : "0 10px 40px rgba(0,0,0,0.1)",
                      padding: "12px 16px",
                    }}
                    formatter={(value: number) => [
                      `₹${value.toLocaleString()}`,
                      "Amount",
                    ]}
                    labelStyle={{
                      color: isDark ? "#e2e8f0" : "#334155",
                      fontWeight: 600,
                    }}
                    itemStyle={{
                      color: isDark ? "#94a3b8" : "#64748b",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            {/* CATEGORY LIST */}
            <Stack spacing={1.5} flex={1} width="100%">
              {sortedData.map((item, index) => {
                const percentage =
                  totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0;
                const color = COLORS[item.category] || "#6366f1";
                const isHovered = hoveredCategory === item.category;

                return (
                  <Fade in timeout={200 + index * 80} key={item.category}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      onMouseEnter={() => handleCategoryHover(item.category)}
                      onMouseLeave={() => handleCategoryHover(null)}
                      sx={{
                        px: 2.5,
                        py: 1.5,
                        borderRadius: 3,
                        cursor: "pointer",
                        background: isHovered
                          ? isDark
                            ? "rgba(99, 102, 241, 0.12)"
                            : "rgba(99, 102, 241, 0.08)"
                          : isDark
                          ? "rgba(148, 163, 184, 0.04)"
                          : "rgba(241, 245, 249, 0.6)",
                        border: isHovered
                          ? `1px solid ${color}40`
                          : isDark
                          ? "1px solid rgba(148, 163, 184, 0.06)"
                          : "1px solid rgba(226, 232, 240, 0.4)",
                        transition: "all 0.25s ease",
                        transform: isHovered ? "translateX(6px)" : "none",
                        boxShadow: isHovered
                          ? isDark
                            ? "0 4px 20px rgba(99, 102, 241, 0.15)"
                            : "0 4px 20px rgba(99, 102, 241, 0.1)"
                          : "none",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 14,
                            height: 14,
                            borderRadius: 1.5,
                            bgcolor: color,
                            boxShadow: isHovered
                              ? `0 0 12px ${color}80`
                              : "none",
                            transition: "all 0.25s ease",
                          }}
                        />
                        <Typography
                          fontSize={14}
                          fontWeight={isHovered ? 600 : 500}
                          sx={{
                            color: isHovered
                              ? isDark
                                ? "#f8fafc"
                                : "#0f172a"
                              : isDark
                              ? "#e2e8f0"
                              : "#334155",
                            transition: "all 0.25s ease",
                          }}
                        >
                          {index + 1}. {item.category}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={3}>
                        {/* Progress bar */}
                        <Box
                          sx={{
                            width: 80,
                            height: 6,
                            borderRadius: 3,
                            bgcolor: isDark
                              ? "rgba(148, 163, 184, 0.1)"
                              : "rgba(203, 213, 225, 0.4)",
                            overflow: "hidden",
                            display: { xs: "none", sm: "block" },
                          }}
                        >
                          <Box
                            sx={{
                              width: `${percentage}%`,
                              height: "100%",
                              bgcolor: color,
                              borderRadius: 3,
                              transition: "width 0.5s ease",
                            }}
                          />
                        </Box>

                        <Typography
                          fontSize={12}
                          fontWeight={500}
                          sx={{
                            color: isDark ? "#64748b" : "#94a3b8",
                            minWidth: 45,
                            textAlign: "right",
                          }}
                        >
                          {percentage.toFixed(1)}%
                        </Typography>
                        <Typography
                          fontWeight={600}
                          sx={{
                            color: isHovered
                              ? color
                              : isDark
                              ? "#cbd5e1"
                              : "#475569",
                            minWidth: 90,
                            textAlign: "right",
                            transition: "all 0.25s ease",
                          }}
                        >
                          ₹{item.amount.toLocaleString()}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Fade>
                );
              })}
            </Stack>
          </Stack>

          {/* Insights Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            {topCategory && (
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 2.5,
                  borderRadius: 3,
                  background: isDark
                    ? "rgba(239, 68, 68, 0.08)"
                    : "rgba(239, 68, 68, 0.05)",
                  border: isDark
                    ? "1px solid rgba(239, 68, 68, 0.15)"
                    : "1px solid rgba(239, 68, 68, 0.12)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: isDark
                        ? "rgba(239, 68, 68, 0.15)"
                        : "rgba(239, 68, 68, 0.1)",
                    }}
                  >
                    <TrendingUpIcon
                      sx={{ color: "#ef4444", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize={12}
                      sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
                    >
                      Highest Spending
                    </Typography>
                    <Typography
                      fontWeight={700}
                      sx={{ color: isDark ? "#f8fafc" : "#0f172a" }}
                    >
                      {topCategory.category} - ₹
                      {topCategory.amount.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            )}

            {lowestCategory && sortedData.length > 1 && (
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 2.5,
                  borderRadius: 3,
                  background: isDark
                    ? "rgba(34, 197, 94, 0.08)"
                    : "rgba(34, 197, 94, 0.05)",
                  border: isDark
                    ? "1px solid rgba(34, 197, 94, 0.15)"
                    : "1px solid rgba(34, 197, 94, 0.12)",
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: isDark
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(34, 197, 94, 0.1)",
                    }}
                  >
                    <TrendingDownIcon
                      sx={{ color: "#22c55e", fontSize: 20 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      fontSize={12}
                      sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
                    >
                      Lowest Spending
                    </Typography>
                    <Typography
                      fontWeight={700}
                      sx={{ color: isDark ? "#f8fafc" : "#0f172a" }}
                    >
                      {lowestCategory.category} - ₹
                      {lowestCategory.amount.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Stack>
      ) : (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            border: `1px dashed ${
              isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.5)"
            }`,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
            No expense data to display
          </Typography>
          <Typography
            fontSize={13}
            sx={{ color: isDark ? "#475569" : "#cbd5e1", mt: 1 }}
          >
            Add some transactions to see your spending breakdown
          </Typography>
        </Box>
      )}
    </Box>
  );
}
