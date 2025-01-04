import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface LoanResultsProps {
  monthlyPayment: number | null;
  totalInterest: number | null;
  totalPayment: number | null;
}

export const LoanResults = ({ monthlyPayment, totalInterest, totalPayment }: LoanResultsProps) => {
  return (
    <Card className="p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Results</h2>
        {monthlyPayment && (
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-3xl font-bold text-primary">£{monthlyPayment.toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-xl font-bold text-secondary">£{totalInterest?.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Payment</p>
                <p className="text-xl font-bold text-accent">£{totalPayment?.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-2">
              <div className="relative w-32 h-20">
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMzg0IDY0SDEyOGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJ2MzIwYzAgMTcuNyAxNC4zIDMyIDMyIDMyaDI1NmMxNy43IDAgMzItMTQuMyAzMi0zMlY5NmMwLTE3LjctMTQuMy0zMi0zMi0zMnptLTY0IDMyMEgxOTJWMjg4aDEyOHY5NnptMC0xMjhIMTkyVjE2MGgxMjh2OTZ6TTMyMCA5NkgxOTJ2LTMyaDEyOHYzMnoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjxwYXRoIGQ9Ik00NDggOTZIMzg0djMyaDY0djMyMEgzODR2MzJoNjRjMTcuNyAwIDMyLTE0LjMgMzItMzJWMTI4YzAtMTcuNy0xNC4zLTMyLTMyLTMyeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+"
                  alt="Luxury Car"
                  className="w-full h-full object-contain animate-float text-primary"
                />
              </div>
              <span className="text-sm font-semibold text-primary bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                car-loan.co.uk
              </span>
            </div>
          </div>
        )}
        {!monthlyPayment && (
          <div className="flex items-center justify-center h-40 text-muted-foreground">
            <div className="text-center">
              <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Calculate your loan to see the results</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};