export const TransactionTypeEnum = {
    Income: "income",
    Expense: "expense",
} as const;

export const PaymentMethodEnum = {
    UPI: "UPI",
    Card: "Card",
    Cash: "Cash",
    Bank: "Bank",
} as const;

export const TransactionStatusEnum = {
    Completed: "completed",
    Pending: "pending",
} as const;


export const CategoryEnum = {
  Salary: "Salary",
  Freelance: "Freelance",
  Food: "Food",
  Bills: "Bills",
  Entertainment: "Entertainment",
  Health: "Health",
  Transport: "Transport",
  Shopping: "Shopping",
  Investment: "Investment",
} as const;

export type TransactionType =
    (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];
export type PaymentMethod = (typeof PaymentMethodEnum)[keyof typeof PaymentMethodEnum];
export type TransactionStatus =
    (typeof TransactionStatusEnum)[keyof typeof TransactionStatusEnum];
export type Category =
  (typeof CategoryEnum)[keyof typeof CategoryEnum];


export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    category: Category;
    date: string;
    paymentMethod: PaymentMethod;
    status: TransactionStatus;
}
