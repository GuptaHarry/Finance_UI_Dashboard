import { useState, useEffect, type ReactNode } from "react";
import { TransactionsContext } from "../Context/TransactionContext";
import { mockTransactions } from "../Data/mockTransactions";
import type { Transaction } from "../Types/mockTransactionType";

const STORAGE_KEY = "finance_dashboard_transactions";

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Try to load from localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error("Failed to parse saved transactions:", e);
        }
      }
    }
    // Fall back to mock data
    return mockTransactions;
  });

  // Persist transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
