import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface BudgetChartProps {
  income: number;
  expenses: number;
}

export const BudgetChart = ({ income, expenses }: BudgetChartProps) => {
  const balance = income - expenses;
  const data = [
    { name: "Expenses", value: expenses },
    { name: "Remaining", value: balance > 0 ? balance : 0 },
  ];

  const COLORS = ["#EF4444", "#10B981"];

  return (
    <div className="w-full h-[200px]">
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
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};