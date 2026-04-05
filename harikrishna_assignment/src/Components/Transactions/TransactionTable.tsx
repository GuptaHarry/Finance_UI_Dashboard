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

import useTransactions from "../../context/TransactionsContext";
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

  let filtered : Transaction[]= transactions ;

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
        borderRadius: 3,
        background: "#ffffff",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* HEADER */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography fontWeight="bold">Transactions</Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          {/* SEARCH */}
          <TextField
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 200 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* TYPE FILTER */}
          <TextField
            select
            size="small"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            sx={{ width: 120 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>

          {/* CATEGORY FILTER */}
          <TextField
            select
            size="small"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(transactions.map((t) => t.category))].map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* EXPORT */}
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={() => exportToExcel(filtered)}
          >
            Export
          </Button>

          {/* ADMIN ONLY */}
          {role === "admin" && (
            <Button variant="contained">+ Add</Button>
          )}
        </Stack>
      </Stack>

      {/* TABLE */}
      <Stack spacing={1}>
        {filtered.length > 0 ? (
          filtered.map((t) => <TransactionRow key={t.id} t={t} />)
        ) : (
          <Typography color="text.secondary">
            No transactions found
          </Typography>
        )}
      </Stack>
    </Box>
  );
}