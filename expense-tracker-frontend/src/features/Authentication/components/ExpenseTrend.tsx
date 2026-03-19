import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function getWeekOfMonth(date: Date): string {
  const day = date.getDate();
  if (day <= 7) return "Week 1";
  if (day <= 14) return "Week 2";
  if (day <= 21) return "Week 3";
  return "Week 4";
}

export default function ExpenseTrend() {
  const [weeklyData, setWeeklyData] = useState([
    { week: "Week 1", total: 0 },
    { week: "Week 2", total: 0 },
    { week: "Week 3", total: 0 },
    { week: "Week 4", total: 0 },
  ]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/expense/getAllExpense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const expenses: { date: string; amount: number }[] = data.expenses;

      // Filter to current month and year
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const totals: Record<string, number> = {
        "Week 1": 0,
        "Week 2": 0,
        "Week 3": 0,
        "Week 4": 0,
      };

      expenses.forEach((entry) => {
        const date = new Date(entry.date);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          const week = getWeekOfMonth(date);
          totals[week] += entry.amount;
        }
      });

      setWeeklyData([
        { week: "Week 1", total: totals["Week 1"] },
        { week: "Week 2", total: totals["Week 2"] },
        { week: "Week 3", total: totals["Week 3"] },
        { week: "Week 4", total: totals["Week 4"] },
      ]);
    };

    fetchExpenses();
  }, []);

  const currentMonthLabel = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
      <div className="rounded-xl border p-4 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Expense Trend — {currentMonthLabel}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip formatter={(value: number) => [`₹${value}`, "Total"]} />
            <Area
                type="monotone"
                dataKey="total"
                stroke="#1d4ed8"
                strokeWidth={2}
                fill="url(#trendGradient)"
                dot={{ r: 4, fill: "#1d4ed8", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  );
}