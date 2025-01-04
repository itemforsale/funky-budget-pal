import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { PlusCircle, Download, DollarSign } from "lucide-react";
import { BudgetChart } from "./BudgetChart";
import { useToast } from "@/components/ui/use-toast";

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
];

export const BudgetDashboard = () => {
  const [currency, setCurrency] = useState("USD");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState<{ category: string; amount: string }[]>([]);
  const { toast } = useToast();

  const handleAddExpense = () => {
    setExpenses([...expenses, { category: "", amount: "" }]);
  };

  const handleExpenseChange = (index: number, field: "category" | "amount", value: string) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    toast({
      title: "Coming Soon",
      description: "PDF export functionality will be available in the next update!",
      duration: 3000,
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const balance = Number(income) - totalExpenses;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Budget Planner
        </span>
        <h1 className="text-4xl font-bold mt-4">Plan Your Budget</h1>
        <p className="text-muted-foreground">Track your income and expenses with style</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Select Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((cur) => (
                  <SelectItem key={cur.code} value={cur.code}>
                    {cur.symbol} {cur.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Monthly Income</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="pl-10"
                placeholder="Enter your income"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Expenses</Label>
              <Button variant="outline" size="sm" onClick={handleAddExpense}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
            {expenses.map((expense, index) => (
              <div key={index} className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Category"
                  value={expense.category}
                  onChange={(e) => handleExpenseChange(index, "category", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Amount"
                  value={expense.amount}
                  onChange={(e) => handleExpenseChange(index, "amount", e.target.value)}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-6">
          <BudgetChart income={Number(income)} expenses={totalExpenses} />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Income</span>
              <span className="text-lg font-bold text-primary">
                {currencies.find(c => c.code === currency)?.symbol}{income || "0"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Expenses</span>
              <span className="text-lg font-bold text-destructive">
                {currencies.find(c => c.code === currency)?.symbol}{totalExpenses}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm font-medium">Balance</span>
              <span className={`text-lg font-bold ${balance >= 0 ? "text-green-500" : "text-destructive"}`}>
                {currencies.find(c => c.code === currency)?.symbol}{balance}
              </span>
            </div>
          </div>

          <Button className="w-full" onClick={handleExportPDF}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </Card>
      </div>
    </div>
  );
};