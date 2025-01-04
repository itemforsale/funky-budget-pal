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
              <svg
                viewBox="0 0 24 24"
                className="w-16 h-16 text-primary animate-spin-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  d="M3,12 L6,12 M18,12 L21,12 M12,3 L12,6 M12,18 L12,21 M5.636,5.636 L7.757,7.757 M16.243,16.243 L18.364,18.364 M5.636,18.364 L7.757,16.243 M16.243,7.757 L18.364,5.636"
                  strokeLinecap="round"
                />
                <path
                  d="M4,12 C4,7.582 7.582,4 12,4 C16.418,4 20,7.582 20,12 C20,16.418 16.418,20 12,20 C7.582,20 4,16.418 4,12 Z"
                  strokeLinecap="round"
                />
                <path
                  d="M7,12 C7,9.239 9.239,7 12,7 C14.761,7 17,9.239 17,12"
                  strokeLinecap="round"
                />
                <path
                  d="M9,12 L15,12"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-semibold text-primary">car-loan.co.uk</span>
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