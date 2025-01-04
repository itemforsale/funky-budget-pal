import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { ShoppingCart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface BudgetChartProps {
  income: number;
  expenses: number;
}

export const BudgetChart = ({ income, expenses }: BudgetChartProps) => {
  const balance = income - expenses;
  const data = [
    { name: "Expenses", value: expenses, icon: ShoppingCart },
    { name: "Remaining", value: balance > 0 ? balance : 0, icon: Wallet },
  ];

  const COLORS = ["#EF4444", "#10B981"];

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry: any, index: number) => {
          const IconComponent = data[index].icon;
          return (
            <div
              key={entry.value}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
                "hover:scale-105 cursor-pointer",
                entry.value === "Expenses" ? "bg-red-100" : "bg-green-100"
              )}
            >
              <IconComponent
                size={16}
                className={entry.value === "Expenses" ? "text-red-500" : "text-green-500"}
              />
              <span className="font-medium">
                {entry.value} ({(entry.payload.percent * 100).toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />
            ))}
          </Pie>
          <Legend content={CustomLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};