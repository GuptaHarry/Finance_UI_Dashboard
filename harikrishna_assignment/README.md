# Finance Dashboard UI

A comprehensive, interactive finance dashboard built with React, TypeScript, and Material-UI. This project demonstrates modern frontend development practices with clean architecture, responsive design, and intuitive user experience.

**Author:** Harikrishna Gupta  
**Tech Stack:** React 19, TypeScript, Vite, Material-UI, Recharts

---

## Features

### Core Requirements

1. **Dashboard Overview**
   - Summary cards displaying Total Balance, Income, Expenses, and Savings Rate
   - Interactive area chart showing balance trend over time
   - Pie chart visualization for spending breakdown by category
   - Real-time calculations based on transaction data

2. **Transactions Section**
   - Complete transaction list with filtering and search
   - Filter by type (Income/Expense) and category
   - Sort by date, amount, or title (ascending/descending)
   - Export transactions to Excel file

3. **Role-Based UI (RBAC)**
   - Toggle between Viewer and Admin modes
   - Viewer: Read-only access to all data
   - Admin: Full CRUD operations on transactions

4. **Insights Section**
   - Highest expense category with amount
   - Average daily spend calculation
   - Spending trend analysis (increasing/decreasing/stable)
   - Savings goal progress indicator (30% target)

5. **State Management**
   - React Context API for global state
   - Separate contexts for UI state and transaction data
   - Custom hooks for clean component integration

### Optional Enhancements (Implemented)

- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Data Persistence**: Local storage for transactions and preferences
- **Export Functionality**: Export filtered transactions to Excel
- **Animations**: Smooth transitions and hover effects throughout
- **Empty State Handling**: Graceful UI when no data is available

---

## Project Structure

```
src/
├── Components/
│   ├── Dashboard/
│   │   ├── SummaryStrip.tsx      # Balance, Income, Expenses cards
│   │   ├── TrendChart.tsx        # Balance trend area chart
│   │   ├── CategoryBreakdown.tsx # Spending pie chart
│   │   └── InsightsPanel.tsx     # Financial insights
│   └── Transactions/
│       ├── TransactionTable.tsx  # Main transaction list
│       ├── TransactionRow.tsx    # Individual transaction item
│       └── AddTransactionModal.tsx # Add/Edit modal
├── Context/
│   ├── UIContext.tsx             # Role and theme state
│   ├── UIProvider.tsx            # UI context provider
│   ├── TransactionContext.ts     # Transaction state type
│   └── TransactionProvider.tsx   # Transaction context provider
├── Hooks/
│   ├── useUI.ts                  # UI context hook
│   └── useTransactions.ts        # Transaction context hook
├── Utils/
│   ├── Analytics.ts              # Data calculations
│   └── Export.ts                 # Excel export utility
├── Data/
│   └── mockTransactions.ts       # Sample transaction data
├── Types/
│   └── mockTransactionType.ts    # TypeScript interfaces
├── Theme/
│   └── theme.ts                  # MUI theme configuration
└── Pages/
    └── DashboardPage.tsx         # Main dashboard layout
```

---

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd harikrishna_assignment
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
npm run preview
```

---

## Key Implementation Details

### State Management Approach
- Used React Context API for simplicity and clarity
- Separate contexts for different concerns (UI vs Data)
- Custom hooks abstract away context consumption
- Persisted state survives page refreshes via localStorage

### Design Decisions
- **Material-UI**: Chosen for comprehensive component library and theming
- **Recharts**: Lightweight, composable charting library
- **TypeScript**: Full type safety across the application
- **Responsive Design**: Mobile-first approach with breakpoints

### Performance Considerations
- Memoized theme computation based on mode
- Efficient filtering and sorting in-place
- Minimal re-renders through proper context structure

---

## Screenshots

The dashboard includes:
- Responsive layout that works on mobile, tablet, and desktop
- Dark and light theme options
- Interactive charts with tooltips
- Animated transitions and hover effects

---

## License

This project was created for evaluation purposes as part of an internship assignment.
