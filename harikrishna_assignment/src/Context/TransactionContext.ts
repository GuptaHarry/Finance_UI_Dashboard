import { createContext } from "react";
import type { Transaction } from "../Types/mockTransactionType";

export const TransactionsContext = createContext<{
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
} | null>(null);