import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useTransactions from "../../context/TransactionsContext";
import { dailyTrend } from "../../utils/analytics";

export default function TrendChart() {
  const { transactions } = useTransactions();
  const data = dailyTrend(transactions);

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        height: 320,
      }}
    >
      <Typography fontWeight="bold" mb={2}>
        Balance Trend
      </Typography>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}