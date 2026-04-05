import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
  Tooltip,
  Chip,
  Fade,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RefreshIcon from "@mui/icons-material/Refresh";

import useTransactions from "../../Hooks/useTransactions";
import useUI from "../../Hooks/useUI";
import TransactionRow from "./TransactionRow";
import AddTransactionModal from "./AddTransactionModal";
import { useState } from "react";
import { exportToExcel } from "../../Utils/Export";
import type { Transaction } from "../../Types/mockTransactionType";
import { mockTransactions } from "../../Data/mockTransactions";

type SortField = "date" | "amount" | "title";
type SortOrder = "asc" | "desc";

export default function TransactionsTable() {
  const { role, themeMode } = useUI();
  const { transactions, setTransactions } = useTransactions();
  
  console.log("[v0] TransactionsTable render - role:", role, "modalOpen:", "themeMode:", themeMode);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null);
  const isDark = themeMode === "dark";

  let filtered: Transaction[] = [...transactions];

  // Apply filters
  if (search) {
    filtered = filtered.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (typeFilter) {
    filtered = filtered.filter((t) => t.type === typeFilter);
  }

  if (categoryFilter) {
    filtered = filtered.filter((t) => t.category === categoryFilter);
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let comparison = 0;

    switch (sortField) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "amount":
        comparison = a.amount - b.amount;
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleAddTransaction = (transaction: Transaction) => {
    console.log("[v0] Adding transaction:", transaction);
    setTransactions((prev) => {
      const newTransactions = [transaction, ...prev];
      console.log("[v0] New transactions count:", newTransactions.length);
      return newTransactions;
    });
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t))
    );
    setEditTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenEdit = (transaction: Transaction) => {
    setEditTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditTransaction(null);
  };

  const handleResetData = () => {
    setTransactions(mockTransactions);
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <Chip
      label={
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <span>{label}</span>
          {sortField === field &&
            (sortOrder === "asc" ? (
              <ArrowUpwardIcon sx={{ fontSize: 14 }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: 14 }} />
            ))}
        </Stack>
      }
      onClick={() => handleSort(field)}
      variant={sortField === field ? "filled" : "outlined"}
      size="small"
      sx={{
        borderColor: sortField === field
          ? "transparent"
          : isDark
          ? "rgba(148, 163, 184, 0.2)"
          : "rgba(203, 213, 225, 0.8)",
        bgcolor: sortField === field
          ? isDark
            ? "rgba(99, 102, 241, 0.2)"
            : "rgba(99, 102, 241, 0.1)"
          : "transparent",
        color: sortField === field
          ? isDark
            ? "#a5b4fc"
            : "#6366f1"
          : isDark
          ? "#94a3b8"
          : "#64748b",
        "&:hover": {
          bgcolor: sortField === field
            ? isDark
              ? "rgba(99, 102, 241, 0.3)"
              : "rgba(99, 102, 241, 0.15)"
            : isDark
            ? "rgba(148, 163, 184, 0.1)"
            : "rgba(203, 213, 225, 0.3)",
        },
        transition: "all 0.2s ease",
      }}
    />
  );

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
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        mb={3}
        spacing={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
          >
            Transactions
          </Typography>
          <Chip
            label={`${filtered.length} items`}
            size="small"
            sx={{
              bgcolor: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
              color: isDark ? "#a5b4fc" : "#6366f1",
              fontSize: 12,
            }}
          />
        </Stack>

        <Stack direction="row" flexWrap="wrap" spacing={2} useFlexGap>
          <TextField
            size="small"
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: "100%", sm: 230 },
              bgcolor: isDark ? "rgba(15, 23, 42, 0.88)" : "rgba(241, 245, 249, 0.9)",
              borderRadius: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.8)",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: isDark ? "#94a3b8" : "#64748b" }} />
                </InputAdornment>
              ),
              sx: { color: isDark ? "#e2e8f0" : "#334155" },
            }}
          />

          <TextField
            select
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{
              width: { xs: "48%", sm: 130 },
              bgcolor: isDark ? "rgba(15, 23, 42, 0.88)" : "rgba(241, 245, 249, 0.9)",
              borderRadius: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.8)",
              },
            }}
            InputProps={{ sx: { color: isDark ? "#e2e8f0" : "#334155" } }}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{
              width: { xs: "48%", sm: 160 },
              bgcolor: isDark ? "rgba(15, 23, 42, 0.88)" : "rgba(241, 245, 249, 0.9)",
              borderRadius: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.8)",
              },
            }}
            InputProps={{ sx: { color: isDark ? "#e2e8f0" : "#334155" } }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {[...new Set(transactions.map((t) => t.category))].map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <Tooltip title="Export to Excel">
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={() => exportToExcel(filtered)}
              sx={{
                borderColor: isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.4)",
                color: isDark ? "#e2e8f0" : "#6366f1",
                borderRadius: 3,
                "&:hover": {
                  borderColor: isDark ? "rgba(99, 102, 241, 0.5)" : "rgba(99, 102, 241, 0.6)",
                  bgcolor: isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)",
                },
              }}
            >
              Export
            </Button>
          </Tooltip>

          {role === "admin" && (
            <>
              <Tooltip title="Reset to sample data">
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleResetData}
                  sx={{
                    borderColor: isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(148, 163, 184, 0.4)",
                    color: isDark ? "#94a3b8" : "#64748b",
                    borderRadius: 3,
                    "&:hover": {
                      borderColor: isDark ? "rgba(148, 163, 184, 0.5)" : "rgba(148, 163, 184, 0.6)",
                      bgcolor: isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(148, 163, 184, 0.05)",
                    },
                  }}
                >
                  Reset
                </Button>
              </Tooltip>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  console.log("[v0] Add button clicked, opening modal");
                  setModalOpen(true);
                }}
                sx={{
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  },
                }}
              >
                Add
              </Button>
            </>
          )}
        </Stack>
      </Stack>

      {/* Sort Options */}
      <Stack direction="row" spacing={1} mb={2} alignItems="center">
        <SortIcon sx={{ color: isDark ? "#64748b" : "#94a3b8", fontSize: 18 }} />
        <Typography fontSize={13} sx={{ color: isDark ? "#64748b" : "#94a3b8" }} mr={1}>
          Sort by:
        </Typography>
        <SortButton field="date" label="Date" />
        <SortButton field="amount" label="Amount" />
        <SortButton field="title" label="Title" />
      </Stack>

      {/* Transactions List */}
      <Stack spacing={1}>
        {filtered.length > 0 ? (
          filtered.map((t, index) => (
            <Fade in timeout={300 + index * 50} key={t.id}>
              <Box>
                <TransactionRow
                  t={t}
                  isAdmin={role === "admin"}
                  onEdit={() => handleOpenEdit(t)}
                  onDelete={() => handleDeleteTransaction(t.id)}
                  isDark={isDark}
                />
              </Box>
            </Fade>
          ))
        ) : (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
              borderRadius: 3,
              border: `1px dashed ${isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.5)"}`,
            }}
          >
            <Typography sx={{ color: isDark ? "#64748b" : "#94a3b8" }} mb={1}>
              No transactions found
            </Typography>
            <Typography
              sx={{ color: isDark ? "#475569" : "#cbd5e1" }}
              fontSize={14}
            >
              {search || typeFilter || categoryFilter
                ? "Try adjusting your filters"
                : "Add your first transaction to get started"}
            </Typography>
            {role === "admin" && !search && !typeFilter && !categoryFilter && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setModalOpen(true)}
                sx={{
                  mt: 2,
                  borderColor: isDark ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.4)",
                  color: isDark ? "#a5b4fc" : "#6366f1",
                  borderRadius: 3,
                }}
              >
                Add Transaction
              </Button>
            )}
          </Box>
        )}
      </Stack>

      {/* Add/Edit Modal */}
      <AddTransactionModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTransaction}
        editTransaction={editTransaction}
        onEdit={handleEditTransaction}
        isDark={isDark}
      />
    </Box>
  );
}
