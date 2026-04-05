import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useTransactions from "../../Hooks/useTransactions";
import { dailyTrend } from "../../Utils/Analytics";

export default function TrendChart() {
  const { transactions } = useTransactions();
  const data = dailyTrend(transactions);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: "linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 14, 27, 0.95))",
        border: "1px solid rgba(99, 102, 241, 0.2)",
        boxShadow: "0 28px 68px rgba(7, 15, 32, 0.22)",
        height: 340,
      }}
    >
      <Typography fontWeight="bold" mb={2} color="#eef2ff">
        Balance Trend
      </Typography>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148, 163, 184, 0.18)", borderRadius: 12 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
