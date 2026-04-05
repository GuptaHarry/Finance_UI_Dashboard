import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  IconButton,
  Box,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import {
  CategoryEnum,
  PaymentMethodEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
  type Transaction,
} from "../../Types/mockTransactionType";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (transaction: Transaction) => void;
  editTransaction?: Transaction | null;
  onEdit?: (transaction: Transaction) => void;
  isDark?: boolean;
}

export default function AddTransactionModal({
  open,
  onClose,
  onAdd,
  editTransaction,
  onEdit,
  isDark = true,
}: AddTransactionModalProps) {
  const isEditMode = !!editTransaction;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState(TransactionTypeEnum.Expense);
  const [category, setCategory] = useState(CategoryEnum.Food);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethodEnum.UPI);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens with edit data
  useEffect(() => {
    if (open) {
      if (editTransaction) {
        setTitle(editTransaction.title);
        setAmount(editTransaction.amount.toString());
        setType(editTransaction.type);
        setCategory(editTransaction.category);
        setDate(editTransaction.date);
        setPaymentMethod(editTransaction.paymentMethod);
      } else {
        setTitle("");
        setAmount("");
        setType(TransactionTypeEnum.Expense);
        setCategory(CategoryEnum.Food);
        setDate(new Date().toISOString().split("T")[0]);
        setPaymentMethod(PaymentMethodEnum.UPI);
      }
      setErrors({});
    }
  }, [open, editTransaction]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Enter a valid amount";
    }

    if (!date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const transaction: Transaction = {
      id: editTransaction?.id || `t${Date.now()}`,
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date,
      paymentMethod,
      status: TransactionStatusEnum.Completed,
    };

    if (isEditMode && onEdit) {
      onEdit(transaction);
    } else {
      onAdd(transaction);
    }

    onClose();
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      bgcolor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(241, 245, 249, 0.8)",
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#94a3b8" : "#64748b",
    },
    "& .MuiOutlinedInput-input": {
      color: isDark ? "#e2e8f0" : "#334155",
    },
    "& .MuiSelect-select": {
      color: isDark ? "#e2e8f0" : "#334155",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: isDark ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.8)",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: isDark
            ? "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(8, 14, 27, 0.96))"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.96))",
          border: isDark
            ? "1px solid rgba(99, 102, 241, 0.22)"
            : "1px solid rgba(226, 232, 240, 1)",
          boxShadow: isDark
            ? "0 40px 100px rgba(0, 0, 0, 0.5)"
            : "0 40px 100px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: isDark ? "#eef2ff" : "#0f172a" }}
        >
          {isEditMode ? "Edit Transaction" : "Add New Transaction"}
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: isDark ? "#94a3b8" : "#64748b" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              sx={inputStyles}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                error={!!errors.amount}
                helperText={errors.amount}
                fullWidth
                sx={inputStyles}
              />

              <TextField
                select
                label="Type"
                value={type}
                onChange={(e) => setType(e.target.value as typeof type)}
                fullWidth
                sx={inputStyles}
              >
                <MenuItem value={TransactionTypeEnum.Income}>Income</MenuItem>
                <MenuItem value={TransactionTypeEnum.Expense}>Expense</MenuItem>
              </TextField>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                fullWidth
                sx={inputStyles}
              >
                {Object.values(CategoryEnum).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as typeof paymentMethod)}
                fullWidth
                sx={inputStyles}
              >
                {Object.values(PaymentMethodEnum).map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={inputStyles}
            />
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: 3,
            color: isDark ? "#94a3b8" : "#64748b",
            "&:hover": {
              bgcolor: isDark ? "rgba(148, 163, 184, 0.1)" : "rgba(148, 163, 184, 0.08)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: 3,
            px: 4,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            },
          }}
        >
          {isEditMode ? "Save Changes" : "Add Transaction"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
