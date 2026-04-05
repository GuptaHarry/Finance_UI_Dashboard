import { Stack, Typography, IconButton, Tooltip, Chip, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Transaction } from "../../Types/mockTransactionType";

interface TransactionRowProps {
  t: Transaction;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  isDark?: boolean;
}

export default function TransactionRow({
  t,
  isAdmin,
  onEdit,
  onDelete,
  isDark = true,
}: TransactionRowProps) {
  const isIncome = t.type === "income";

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
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
    return colors[category] || "#6366f1";
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 2,
        borderRadius: 3,
        border: isDark
          ? "1px solid rgba(148, 163, 184, 0.12)"
          : "1px solid rgba(226, 232, 240, 0.8)",
        background: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
        transition: "all 0.2s ease",
        "&:hover": {
          background: isDark ? "rgba(15, 23, 42, 0.95)" : "rgba(248, 250, 252, 1)",
          transform: "translateY(-2px)",
          boxShadow: isDark
            ? "0 8px 24px rgba(0, 0, 0, 0.15)"
            : "0 8px 24px rgba(0, 0, 0, 0.06)",
          borderColor: isDark ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.15)",
        },
      }}
    >
      {/* LEFT - Transaction Info */}
      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
        {/* Icon/Indicator */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isIncome
              ? "rgba(34, 197, 94, 0.15)"
              : "rgba(251, 113, 133, 0.15)",
            color: isIncome ? "#22c55e" : "#fb7185",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {isIncome ? "+" : "-"}
        </Box>

        <Stack spacing={0.25} flex={1}>
          <Typography
            fontWeight={600}
            sx={{ color: isDark ? "#f8fafc" : "#0f172a" }}
            fontSize={15}
          >
            {t.title}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
            <Chip
              label={t.category}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                bgcolor: `${getCategoryColor(t.category)}20`,
                color: getCategoryColor(t.category),
                border: `1px solid ${getCategoryColor(t.category)}40`,
              }}
            />
            <Typography
              fontSize={12}
              sx={{ color: isDark ? "#64748b" : "#94a3b8" }}
            >
              {new Date(t.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Typography>
            <Typography
              fontSize={12}
              sx={{ color: isDark ? "#475569" : "#cbd5e1" }}
            >
              via {t.paymentMethod}
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {/* RIGHT - Amount & Actions */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography
          fontWeight="bold"
          fontSize={16}
          sx={{
            color: isIncome ? "#22c55e" : "#fb7185",
            minWidth: 100,
            textAlign: "right",
          }}
        >
          {isIncome ? "+" : "-"}₹{t.amount.toLocaleString()}
        </Typography>

        {isAdmin && (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={onEdit}
                sx={{
                  color: isDark ? "#64748b" : "#94a3b8",
                  "&:hover": {
                    color: isDark ? "#a5b4fc" : "#6366f1",
                    bgcolor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.08)",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={onDelete}
                sx={{
                  color: isDark ? "#64748b" : "#94a3b8",
                  "&:hover": {
                    color: "#f87171",
                    bgcolor: "rgba(248, 113, 113, 0.1)",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
