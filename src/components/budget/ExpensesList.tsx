import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface ExpensesListProps {
  expenses: Array<{ category: string; amount: string }>;
  onAddExpense: () => void;
  onExpenseChange: (index: number, field: "category" | "amount", value: string) => void;
}

export const ExpensesList = ({ expenses, onAddExpense, onExpenseChange }: ExpensesListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Expenses</Label>
        <Button variant="outline" size="sm" onClick={onAddExpense}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>
      {expenses.map((expense, index) => (
        <div key={index} className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Category"
            value={expense.category}
            onChange={(e) => onExpenseChange(index, "category", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => onExpenseChange(index, "amount", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};