import { useState, type ReactNode } from "react";
import { TransactionsContext } from "./TransactionsContext";
import { mockTransactions } from "../data/mockTransactions";
import type { Transaction } from "../Types/mockTransactionType";

export function TransactionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}