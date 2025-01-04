import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Car, Coins, Banknote, PoundSterling } from "lucide-react";
import { CarLoanCalculator } from "./loans/CarLoanCalculator";
import { LoanResults } from "./loans/LoanResults";
import { InfoBox } from "./InfoBox";

export const BudgetDashboard = () => {
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateLoan = (principal: string, rate: string, years: string) => {
    const p = Number(principal);
    const r = Number(rate) / 100 / 12;
    const n = Number(years) * 12;

    if (!p || !r || !n) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive",
      });
      return;
    }

    const monthlyPaymentCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaymentCalc = monthlyPaymentCalc * n;
    const totalInterestCalc = totalPaymentCalc - p;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);

    toast({
      title: "Calculation Complete! 🎉",
      description: "Scroll down to see your detailed loan breakdown.",
      className: "bg-secondary text-secondary-foreground",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Car className="w-8 h-8 text-primary animate-bounce" />
          <Banknote className="w-8 h-8 text-secondary animation-delay-2000 animate-bounce" />
          <PoundSterling className="w-8 h-8 text-accent animation-delay-4000 animate-bounce" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Calculate Your Car Loan
        </h2>
        <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
      </div>

      <InfoBox />

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <CarLoanCalculator onCalculate={calculateLoan} />
        <LoanResults
          monthlyPayment={monthlyPayment}
          totalInterest={totalInterest}
          totalPayment={totalPayment}
        />
      </div>
    </div>
  );
};