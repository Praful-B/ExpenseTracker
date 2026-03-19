import AddExpensePanel from "../components/AddExpensePanel";
import DashboardHeader from "../components/DashboardHeader";
import ExpenseBreakdown from "../components/ExpenseBreakdown";
import ExpenseTrend from "../components/ExpenseTrend";
import RecentTransactionsPanel from "../components/RecentTransactionPanel";
import SpendingOverview from "../components/SpendingOverview";
import TotalExpenseVsMonthlyBudget from "../components/TotalExpenseVsMonthlyBudget";

export default function Dashboard() {
    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader />

            <div className="grid grid-cols-[2fr_3fr] gap-4 p-4 items-start">

                <div className="flex flex-col gap-4">
                    <AddExpensePanel />
                    <RecentTransactionsPanel />
                </div>

                <div className="flex flex-col gap-4">
                    <ExpenseBreakdown />
                    <SpendingOverview />
                    <TotalExpenseVsMonthlyBudget />
                    <ExpenseTrend />
                </div>

            </div>
        </div>
    );
}