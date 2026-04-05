import { Box, Stack, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { useContext } from "react";
import { TransactionsContext } from "../../Context/TransactionContext";

const useTransactions = () => useContext(TransactionsContext);
import { categoryBreakdown } from "../../Utils/Analytics";

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#ef4444",
  "#38bdf8",
  "#f59e0b",
  "#a855f7",
];

export default function CategoryBreakdown() {
  const context = useTransactions();
  const transactions = context?.transactions || [];
  const data = categoryBreakdown(transactions);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 14, 27, 0.92))",
        border: "1px solid rgba(99, 102, 241, 0.18)",
        boxShadow: "0 28px 68px rgba(7, 15, 32, 0.22)",
      }}
    >
      <Typography fontWeight="bold" mb={2} color="#eef2ff">
        Spending Breakdown
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="center"
      >
        {/* PIE */}
        <Box sx={{ width: 250, height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                outerRadius={90}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* LIST (IMPORTANT) */}
        <Stack spacing={1} flex={1}>
          {data
            .sort((a, b) => b.amount - a.amount)
            .map((item, index) => (
              <Stack
                key={item.category}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  px: 3,
                  py: 1.75,
                  borderRadius: 3,
                  background: "rgba(148, 163, 184, 0.08)",
                }}
              >
                <Typography fontSize={14} color="#e2e8f0">
                  {index + 1}. {item.category}
                </Typography>

                <Typography fontWeight={600} color="#cbd5e1">
                  ₹{item.amount.toLocaleString()}
                </Typography>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}
