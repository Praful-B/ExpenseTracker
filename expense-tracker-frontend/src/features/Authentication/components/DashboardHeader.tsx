import { Button } from "@/components/ui/button.tsx";
import { PlusIcon, DownloadIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

export default function DashboardHeader() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleAdd() {
    const amountInput = document.querySelector<HTMLInputElement>('input[name="amount"]');
    amountInput?.scrollIntoView({ behavior: "smooth", block: "center" });
    amountInput?.focus();
  }

  async function handleExport() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/expense/getAllExpense`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const expenses = data.expenses;

    if (!expenses || expenses.length === 0) {
      alert("No expenses to export.");
      return;
    }

    const headers = ["Date", "Category", "Amount", "Notes"];
    const rows = expenses.map((e: any) => [
      new Date(e.date).toLocaleDateString("en-IN"),
      e.category,
      e.amount,
      `"${(e.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fintrak-expenses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSettings() {
    alert("Settings coming soon!");
  }

  return (
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <h1 className="font-bold text-xl">Expense Tracker</h1>
        <div className="flex gap-2">
          <Button onClick={handleAdd} variant="outline" size="sm">
            <PlusIcon className="w-4 h-4 mr-1" /> Add
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-1" /> Export
          </Button>
          <Button onClick={handleSettings} variant="outline" size="sm">
            <SettingsIcon className="w-4 h-4 mr-1" /> Settings
          </Button>
          <Button onClick={handleLogout} variant="destructive" size="sm">
            <LogOutIcon className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </div>
  );
}