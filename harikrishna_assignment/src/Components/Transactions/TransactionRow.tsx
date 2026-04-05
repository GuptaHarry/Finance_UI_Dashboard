import { Stack, Typography } from "@mui/material";
import type { Transaction } from "../../Types/mockTransactionType";

export default function TransactionRow({ t }: { t: Transaction }) {
  const isIncome = t.type === "income";

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        p: 1.5,
        borderRadius: 2,
        "&:hover": {
          background: "#f1f5f9",
        },
      }}
    >
      {/* LEFT */}
      <Stack>
        <Typography fontWeight={500}>{t.title}</Typography>

        <Typography fontSize={12} color="text.secondary">
          {t.category} • {t.date}
        </Typography>
      </Stack>

      {/* RIGHT */}
      <Typography
        fontWeight="bold"
        sx={{
          color: isIncome ? "#22c55e" : "#ef4444",
        }}
      >
        {isIncome ? "+" : "-"}₹{t.amount.toLocaleString()}
      </Typography>
    </Stack>
  );
}