import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CurrencySelector } from "./budget/CurrencySelector";
import { IncomeInput } from "./budget/IncomeInput";
import { ExpensesList } from "./budget/ExpensesList";
import { BudgetSummary } from "./budget/BudgetSummary";

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "CHF", symbol: "CHF" },
  { code: "CNY", symbol: "¥" },
  { code: "HKD", symbol: "HK$" },
  { code: "NZD", symbol: "NZ$" },
  { code: "SEK", symbol: "kr" },
  { code: "KRW", symbol: "₩" },
  { code: "SGD", symbol: "S$" },
  { code: "NOK", symbol: "kr" },
  { code: "MXN", symbol: "$" },
  { code: "INR", symbol: "₹" },
  { code: "RUB", symbol: "₽" },
  { code: "ZAR", symbol: "R" },
  { code: "BRL", symbol: "R$" },
  { code: "AED", symbol: "د.إ" },
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

  const getPersonalizedAdvice = (income: number, totalExpenses: number) => {
    const balance = income - totalExpenses;
    const expenseRatio = (totalExpenses / income) * 100;
    
    let advice = [];
    
    if (expenseRatio > 80) {
      advice.push("Your expenses are quite high relative to your income. Consider reviewing non-essential expenses to improve your financial health.");
    } else if (expenseRatio < 50) {
      advice.push("Great job keeping expenses low! Consider investing or saving the surplus for future goals.");
    }

    if (balance < 0) {
      advice.push("Warning: You're currently in a deficit. Look for ways to increase income or reduce expenses.");
    } else if (balance > income * 0.3) {
      advice.push("You have a healthy savings rate. Consider investing in retirement accounts or emergency funds.");
    }

    if (expenses.length === 0) {
      advice.push("Try adding your regular expenses to get a better picture of your budget.");
    }

    return advice.join("\n");
  };

  const handleExportPDF = () => {
    const advice = getPersonalizedAdvice(Number(income), totalExpenses);
    toast({
      title: "Budget Analysis",
      description: advice,
      duration: 5000,
    });
    
    toast({
      title: "Coming Soon",
      description: "PDF export with personalized advice will be available in the next update!",
      duration: 3000,
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$";

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Budget Planner
        </span>
        <div className="mt-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-pulse transform hover:scale-105 transition-transform duration-200 cursor-pointer">
            budget-planner.com
          </h1>
          <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
        </div>
        <p className="text-muted-foreground">Track your income and expenses with style</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <CurrencySelector 
            currency={currency}
            setCurrency={setCurrency}
            currencies={currencies}
          />
          <IncomeInput 
            income={income}
            setIncome={setIncome}
          />
          <ExpensesList 
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onExpenseChange={handleExpenseChange}
          />
        </Card>

        <Card className="p-6">
          <BudgetSummary 
            income={Number(income)}
            totalExpenses={totalExpenses}
            currency={currency}
            currencySymbol={currencySymbol}
            onExportPDF={handleExportPDF}
          />
        </Card>
      </div>
    </div>
  );
};