import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { DollarSign, ShoppingCart, Wallet } from "lucide-react";
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

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const IconComponent = data[index].icon;

    return (
      <g className="animate-fade-in">
        <foreignObject
          x={x - 12}
          y={y - 12}
          width={24}
          height={24}
          className="animate-float"
        >
          <IconComponent className="text-white" size={24} />
        </foreignObject>
      </g>
    );
  };

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
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
            className="animate-spin-slow"
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