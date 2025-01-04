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
            <div className="flex flex-col items-center justify-center mt-4">
              <span className="text-2xl font-bold text-primary bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
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