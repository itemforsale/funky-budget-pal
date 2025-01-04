import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { BudgetChart } from "../BudgetChart";

interface BudgetSummaryProps {
  income: number;
  totalExpenses: number;
  currency: string;
  currencySymbol: string;
  onExportPDF: () => void;
}

export const BudgetSummary = ({ income, totalExpenses, currency, currencySymbol, onExportPDF }: BudgetSummaryProps) => {
  const balance = income - totalExpenses;

  return (
    <div className="space-y-6">
      <BudgetChart income={income} expenses={totalExpenses} />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Income</span>
          <span className="text-lg font-bold text-primary">
            {currencySymbol}{income || "0"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Expenses</span>
          <span className="text-lg font-bold text-destructive">
            {currencySymbol}{totalExpenses}
          </span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-sm font-medium">Balance</span>
          <span className={`text-lg font-bold ${balance >= 0 ? "text-green-500" : "text-destructive"}`}>
            {currencySymbol}{balance}
          </span>
        </div>
      </div>

      <Button className="w-full" onClick={onExportPDF}>
        <Download className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
};