import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Car, Home, CreditCard, Coins, Banknote, PoundSterling } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalLoanCalculator } from "./loans/PersonalLoanCalculator";
import { CarLoanCalculator } from "./loans/CarLoanCalculator";
import { MortgageCalculator } from "./loans/MortgageCalculator";
import { LoanResults } from "./loans/LoanResults";

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
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coins className="w-8 h-8 text-primary animate-bounce" />
            <Banknote className="w-8 h-8 text-secondary animation-delay-2000 animate-bounce" />
            <PoundSterling className="w-8 h-8 text-accent animation-delay-4000 animate-bounce" />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transform hover:scale-105 transition-all duration-700 cursor-pointer">
            Loan-Calculator.co.uk
          </h1>
          <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
        </div>
        <p className="text-muted-foreground">Calculate your loan payments in GBP</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="personal" className="data-[state=active]:bg-primary/20">
            <CreditCard className="mr-2" />
            Personal Loan
          </TabsTrigger>
          <TabsTrigger value="car" className="data-[state=active]:bg-primary/20">
            <Car className="mr-2" />
            Car Loan
          </TabsTrigger>
          <TabsTrigger value="mortgage" className="data-[state=active]:bg-primary/20">
            <Home className="mr-2" />
            Mortgage
          </TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <TabsContent value="personal">
            <PersonalLoanCalculator
              onCalculate={calculateLoan}
              monthlyPayment={monthlyPayment}
              totalPayment={totalPayment}
              totalInterest={totalInterest}
            />
          </TabsContent>

          <TabsContent value="car">
            <CarLoanCalculator onCalculate={calculateLoan} />
          </TabsContent>

          <TabsContent value="mortgage">
            <MortgageCalculator onCalculate={calculateLoan} />
          </TabsContent>

          <LoanResults
            monthlyPayment={monthlyPayment}
            totalInterest={totalInterest}
            totalPayment={totalPayment}
          />
        </div>
      </Tabs>
    </div>
  );
};