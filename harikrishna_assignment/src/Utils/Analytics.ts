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
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let runningBalance = 0;
  const map: Record<string, number> = {};

  sortedTransactions.forEach((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    map[t.date] = runningBalance;
  });

  return Object.entries(map).map(([date, value]) => ({
    date: new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    value,
  }));
}

export function generateInsights(transactions: Transaction[]) {
  const categoryMap: Record<string, number> = {};
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  expenseTransactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const highest = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];
  const lowest = Object.entries(categoryMap).sort((a, b) => a[1] - b[1])[0];

  // Calculate average daily spend
  const dates = [...new Set(expenseTransactions.map((t) => t.date))];
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const avgDailySpend = dates.length > 0 ? totalExpenses / dates.length : 0;

  // Count transactions by type
  const incomeCount = transactions.filter((t) => t.type === "income").length;
  const expenseCount = expenseTransactions.length;

  return {
    highestCategory: highest?.[0],
    highestAmount: highest?.[1],
    lowestCategory: lowest?.[0],
    lowestAmount: lowest?.[1],
    avgDailySpend,
    totalTransactions: transactions.length,
    incomeCount,
    expenseCount,
  };
}

export function getMonthlyComparison(transactions: Transaction[]) {
  const monthlyData: Record<string, { income: number; expense: number }> = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0 };
    }

    if (t.type === "income") {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expense += t.amount;
    }
  });

  return Object.entries(monthlyData)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
      ...data,
      savings: data.income - data.expense,
    }));
}

export function getSpendingTrend(transactions: Transaction[]) {
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  if (expenseTransactions.length < 2) {
    return { trend: "stable", percentage: 0 };
  }

  // Sort by date
  const sorted = [...expenseTransactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Get first half and second half
  const mid = Math.floor(sorted.length / 2);
  const firstHalf = sorted.slice(0, mid);
  const secondHalf = sorted.slice(mid);

  const firstTotal = firstHalf.reduce((sum, t) => sum + t.amount, 0);
  const secondTotal = secondHalf.reduce((sum, t) => sum + t.amount, 0);

  if (firstTotal === 0) {
    return { trend: "up", percentage: 100 };
  }

  const percentage = ((secondTotal - firstTotal) / firstTotal) * 100;

  return {
    trend: percentage > 5 ? "up" : percentage < -5 ? "down" : "stable",
    percentage: Math.abs(percentage),
  };
}

export function getTopExpenses(transactions: Transaction[], limit = 5) {
  return transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}
