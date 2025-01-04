import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator } from "lucide-react";

export const BudgetDashboard = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const { toast } = useToast();

  const calculateMonthlyPayment = () => {
    const principal = Number(loanAmount);
    const rate = Number(interestRate) / 100 / 12; // Monthly interest rate
    const months = Number(loanTerm) * 12; // Convert years to months

    if (!principal || !rate || !months) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive",
      });
      return;
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    toast({
      title: "Loan Calculation Results",
      description: `Monthly Payment: £${monthlyPayment.toFixed(2)}
                   Total Interest: £${totalInterest.toFixed(2)}
                   Total Payment: £${totalPayment.toFixed(2)}`,
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2 relative">
        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Loan Calculator
        </span>
        <div className="mt-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transform hover:scale-105 transition-all duration-700 cursor-pointer">
            Loan-Calculator.co.uk
          </h1>
          <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
          
          {/* Money symbols floating animation */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <span className="absolute text-primary animate-float text-2xl" style={{ left: '20%', animationDelay: '0s' }}>💰</span>
            <span className="absolute text-secondary animate-float text-2xl" style={{ left: '40%', animationDelay: '1s' }}>💸</span>
            <span className="absolute text-accent animate-float text-2xl" style={{ left: '60%', animationDelay: '2s' }}>💵</span>
            <span className="absolute text-primary animate-float text-2xl" style={{ left: '80%', animationDelay: '3s' }}>💰</span>
            <span className="absolute text-secondary animate-float animation-delay-2000 text-2xl" style={{ left: '30%' }}>💸</span>
            <span className="absolute text-accent animation-delay-4000 animate-float text-2xl" style={{ left: '70%' }}>💵</span>
          </div>
        </div>
        <p className="text-muted-foreground">Calculate your loan payments in GBP</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Loan Amount (£)</Label>
            <div className="relative">
              <PoundSterling className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="pl-10"
                placeholder="Enter loan amount"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Annual Interest Rate (%)</Label>
            <div className="relative">
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Loan Term (Years)</Label>
            <div className="relative">
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term"
              />
            </div>
          </div>

          <Button 
            onClick={calculateMonthlyPayment}
            className="w-full mt-4"
          >
            <Calculator className="mr-2" />
            Calculate Loan
          </Button>
        </Card>

        <Card className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-primary">Loan Calculator Guide</h2>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>• Enter the total amount you wish to borrow in GBP</li>
              <li>• Input the annual interest rate (e.g., 5.5 for 5.5%)</li>
              <li>• Specify the loan term in years</li>
              <li>• Click calculate to see your monthly payments</li>
            </ul>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                This calculator provides estimates based on a fixed interest rate. 
                Actual loan terms may vary. Please consult with your lender for precise figures.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};