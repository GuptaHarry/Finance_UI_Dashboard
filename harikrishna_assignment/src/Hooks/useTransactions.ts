import { useContext } from "react";
import { TransactionsContext } from "../Context/TransactionsContext";

export default function useTransactions() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used within TransactionsProvider"
    );
  }

  return context;
 
}