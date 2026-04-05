import { Stack, Typography } from "@mui/material";
import type { Transaction } from "../../Types/mockTransactionType";

export default function TransactionRow({ t }: { t: Transaction }) {
  const isIncome = t.type === "income";

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid rgba(148, 163, 184, 0.12)",
        background: "rgba(15, 23, 42, 0.8)",
        transition: "background 0.2s ease, transform 0.2s ease",
        "&:hover": {
          background: "rgba(15, 23, 42, 0.95)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {/* LEFT */}
      <Stack spacing={0.5}>
        <Typography fontWeight={600} color="#f8fafc">
          {t.title}
        </Typography>

        <Typography fontSize={12} color="#94a3b8">
          {t.category} • {t.date}
        </Typography>
      </Stack>

      {/* RIGHT */}
      <Typography
        fontWeight="bold"
        sx={{
          color: isIncome ? "#22c55e" : "#fb7185",
        }}
      >
        {isIncome ? "+" : "-"}₹{t.amount.toLocaleString()}
      </Typography>
    </Stack>
  );
}
