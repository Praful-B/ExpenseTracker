import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  food: { label: "Food", color: "#f97316" },
  travel: { label: "Travel", color: "#3b82f6" },
  social: { label: "Social", color: "#a855f7" },
  stationary: { label: "Stationary", color: "#22c55e" },
  util: { label: "Util", color: "#eab308" },
  default: { label: "Default", color: "#6b7280" },
};

export default function ExpenseBreakdown(){
  // Aggregate data
  const categoryTotals = expenses.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.amount;
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
    fill: chartConfig[category]?.color || "#6b7280"
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