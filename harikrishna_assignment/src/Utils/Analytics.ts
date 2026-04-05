import type { Transaction } from "../Types/mockTransactionType";

export function calculateSummary(transactions: Transaction[]) {
  let income = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  return {
    income,
    expenses,
    balance: income - expenses,
    savingsRate: income ? ((income - expenses) / income) * 100 : 0,
  };
}


export function categoryBreakdown(transactions: Transaction[]) {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(map).map(([category, amount]) => ({
    category,
    amount,
  }));
}

export function dailyTrend(transactions: Transaction[]) {
  const map: Record<string, number> = {};

  transactions.forEach((t) => {
    map[t.date] = (map[t.date] || 0) + (t.type === "income" ? t.amount : -t.amount);
  });

  return Object.entries(map).map(([date, value]) => ({
    date,
    value,
  }));
}


export function generateInsights(transactions: Transaction[]) {
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return {
    highestCategory: highest?.[0],
    highestAmount: highest?.[1],
  };
}