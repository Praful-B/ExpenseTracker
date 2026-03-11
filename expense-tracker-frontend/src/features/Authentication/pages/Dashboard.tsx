import AddExpensePanel from "../components/AddExpensePanel";
import DashboardHeader from "../components/DashboardHeader";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import ExpenseTrend from "../components/ExpenseTrend";
import RecentTransactionsPanel from "../components/RecentTransactionPanel";
import SpendingOverview from "../components/SpendingOverview";
import TotalExpenseVsMonthlyBudget from "../components/TotalExpenseVsMonthlyBudget";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <AddExpensePanel />
      <ExpenseBreakdown />
      <RecentTransactionsPanel />
      <SpendingOverview />
      <TotalExpenseVsMonthlyBudget />
      <ExpenseTrend />
    </>
  );
}
