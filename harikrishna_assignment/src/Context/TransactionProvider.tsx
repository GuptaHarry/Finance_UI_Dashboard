import { useState, type ReactNode } from "react";
import { TransactionsContext } from "../Context/TransactionContext";
import { mockTransactions } from "../Data/mockTransactions";
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
