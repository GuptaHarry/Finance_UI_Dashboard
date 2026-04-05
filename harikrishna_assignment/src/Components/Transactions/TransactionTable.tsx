import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  MenuItem,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";

import useTransactions from "../../Hooks/useTransactions";
import TransactionRow from "./TransactionRow";
import { useState } from "react";
import { exportToExcel } from "../../Utils/Export";
import useUI from "../../Hooks/useUI";
import type { Transaction } from "../../Types/mockTransactionType";

export default function TransactionsTable() {
  const { role } = useUI();
  const { transactions } = useTransactions();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  let filtered: Transaction[] = transactions;

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
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        spacing={2}
      >
        <Typography variant="h6" fontWeight={700} color="#eef2ff">
          Transactions
        </Typography>

        <Stack direction="row" flexWrap="wrap" spacing={2}>
          <TextField
            size="small"
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 230, bgcolor: "rgba(15, 23, 42, 0.88)", borderRadius: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94a3b8" }} />
                </InputAdornment>
              ),
              sx: { color: "#e2e8f0" },
            }}
          />

          <TextField
            select
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{ width: 130, bgcolor: "rgba(15, 23, 42, 0.88)", borderRadius: 3 }}
            InputProps={{ sx: { color: "#e2e8f0" } }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ width: 160, bgcolor: "rgba(15, 23, 42, 0.88)", borderRadius: 3 }}
            InputProps={{ sx: { color: "#e2e8f0" } }}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(transactions.map((t) => t.category))].map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={() => exportToExcel(filtered)}
            sx={{ borderColor: "rgba(99, 102, 241, 0.3)", color: "#e2e8f0" }}
          >
            Export
          </Button>

          {role === "admin" && (
            <Button variant="contained" color="secondary">
              + Add
            </Button>
          )}
        </Stack>
      </Stack>

      <Stack spacing={1}>
        {filtered.length > 0 ? (
          filtered.map((t) => <TransactionRow key={t.id} t={t} />)
        ) : (
          <Typography color="#94a3b8">No transactions found</Typography>
        )}
      </Stack>
    </Box>
  );
}
