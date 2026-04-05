import { Box, Stack, Typography, Chip } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import { categoryBreakdown, calculateSummary } from "../../Utils/Analytics";

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

export default function CategoryBreakdown() {
  const { transactions } = useTransactions();
  const { themeMode } = useUI();
  const data = categoryBreakdown(transactions);
  const summary = calculateSummary(transactions);
  const isDark = themeMode === "dark";

  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  const totalExpenses = summary.expenses;

  return (
    <Box
      sx={{
        p: 3,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography
          fontWeight="bold"
          sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
        >
          Spending Breakdown
        </Typography>
        <Chip
          label={`${data.length} categories`}
          size="small"
          sx={{
            bgcolor: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
            color: isDark ? "#a5b4fc" : "#6366f1",
            fontSize: 11,
          }}
        />
      </Stack>

      {data.length > 0 ? (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems="center"
        >
          {/* PIE CHART */}
          <Box sx={{ width: { xs: 220, md: 250 }, height: { xs: 220, md: 250 } }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={sortedData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {sortedData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={COLORS[entry.category] || "#6366f1"}
                      stroke={isDark ? "#0f172a" : "#ffffff"}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#0f172a" : "#ffffff",
                    border: isDark
                      ? "1px solid rgba(148, 163, 184, 0.18)"
                      : "1px solid rgba(226, 232, 240, 1)",
                    borderRadius: 12,
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* CATEGORY LIST */}
          <Stack spacing={1.5} flex={1} width="100%">
            {sortedData.map((item, index) => {
              const percentage = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0;
              const color = COLORS[item.category] || "#6366f1";

              return (
                <Stack
                  key={item.category}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    borderRadius: 3,
                    background: isDark
                      ? "rgba(148, 163, 184, 0.06)"
                      : "rgba(241, 245, 249, 0.8)",
                    border: isDark
                      ? "1px solid rgba(148, 163, 184, 0.08)"
                      : "1px solid rgba(226, 232, 240, 0.6)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background: isDark
                        ? "rgba(148, 163, 184, 0.1)"
                        : "rgba(241, 245, 249, 1)",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 1,
                        bgcolor: color,
                      }}
                    />
                    <Typography
                      fontSize={14}
                      fontWeight={500}
                      sx={{ color: isDark ? "#e2e8f0" : "#334155" }}
                    >
                      {index + 1}. {item.category}
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                      fontSize={12}
                      sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
                    >
                      {percentage.toFixed(1)}%
                    </Typography>
                    <Typography
                      fontWeight={600}
                      sx={{ color: isDark ? "#cbd5e1" : "#475569", minWidth: 80, textAlign: "right" }}
                    >
                      ₹{item.amount.toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      ) : (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            border: `1px dashed ${isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.5)"}`,
            borderRadius: 3,
          }}
        >
          <Typography sx={{ color: isDark ? "#64748b" : "#94a3b8" }}>
            No expense data to display
          </Typography>
        </Box>
      )}
    </Box>
  );
}
