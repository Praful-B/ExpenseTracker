import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  food: { label: "Food", color: "#f97316" },
  travel: { label: "Travel", color: "#3b82f6" },
  social: { label: "Social", color: "#a855f7" },
  stationary: { label: "Stationary", color: "#22c55e" },
  util: { label: "Util", color: "#eab308" },
  default: { label: "Default", color: "#6b7280" },
};

export default function ExpenseBreakdown() {
  const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>([]);
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
      setExpenses(data.expenses);
    };
    fetchExpenses();
  }, []);

  const categoryTotals = expenses.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
    fill: chartConfig[category as keyof typeof chartConfig]?.color || "#6b7280",
  }));

  return (
      <ChartContainer config={chartConfig} className="h-75">
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name">
            {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartContainer>
  );
}