import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function SpendingOverview() {
  const [monthlyData, setMonthlyData] = useState(
      MONTHS.map((month) => ({ month, total: 0 }))
  );

  const token = localStorage.getItem("token");
  const currentMonth = new Date().getMonth(); // 0-indexed
  const currentYear = new Date().getFullYear();

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

      // Totals for current year only — resets automatically each new year
      const totals = new Array(12).fill(0);

      expenses.forEach((entry) => {
        const date = new Date(entry.date);
        if (date.getFullYear() === currentYear) {
          totals[date.getMonth()] += entry.amount;
        }
      });

      setMonthlyData(MONTHS.map((month, i) => ({ month, total: totals[i] })));
    };

    fetchExpenses();
  }, []);

  return (
      <div className="rounded-xl border shadow-sm overflow-hidden">
        {/* Blue header matching the screenshot */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3">
          <h2 className="text-white font-semibold text-base">Spending Overview</h2>
        </div>

        <div className="p-4">
          <p className="text-sm text-muted-foreground font-medium mb-3">
            Monthly Spending — {currentYear}
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <Tooltip
                  formatter={(value: number) => [`₹${value}`, "Spent"]}
                  cursor={{ fill: "rgba(59,130,246,0.08)" }}
              />
              <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry, index) => (
                    <Cell
                        key={entry.month}
                        // Current month gets the dark highlight, past months mid-blue, future months light
                        fill={
                          index === currentMonth
                              ? "#1d4ed8"
                              : index < currentMonth
                                  ? "#60a5fa"
                                  : "#bfdbfe"
                        }
                    />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
}