import { Box, Stack, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import useTransactions from "../../context/TransactionsContext";
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
  const { transactions } = useTransactions();
  const data = categoryBreakdown(transactions);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      <Typography fontWeight="bold" mb={2}>
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
              >
                <Typography fontSize={14}>
                  {index + 1}. {item.category}
                </Typography>

                <Typography fontWeight={600}>
                  ₹{item.amount.toLocaleString()}
                </Typography>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
}