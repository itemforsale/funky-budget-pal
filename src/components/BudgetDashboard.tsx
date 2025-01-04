import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const BudgetDashboard = () => {
  const [loanAmount, setLoanAmount] = useState("5000");
  const [interestRate, setInterestRate] = useState("3.9");
  const [loanTerm, setLoanTerm] = useState("3");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateMonthlyPayment = () => {
    const principal = Number(loanAmount);
    const rate = Number(interestRate) / 100 / 12;
    const months = Number(loanTerm) * 12;

    if (!principal || !rate || !months) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid numbers.",
        variant: "destructive",
      });
      return;
    }

    const monthlyPaymentCalc = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const totalPaymentCalc = monthlyPaymentCalc * months;
    const totalInterestCalc = totalPaymentCalc - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);

    toast({
      title: "Calculation Complete! 🎉",
      description: "Scroll down to see your detailed loan breakdown.",
      className: "bg-secondary text-secondary-foreground",
    });
  };

  const handleSliderChange = (value: number[], type: 'amount' | 'term') => {
    if (type === 'amount') {
      setLoanAmount(value[0].toString());
    } else {
      setLoanTerm(value[0].toString());
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
          Loan Calculator
        </span>
        <div className="mt-4">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transform hover:scale-105 transition-all duration-700 cursor-pointer">
            Loan-Calculator.co.uk
          </h1>
          <div className="h-1 w-48 mx-auto mt-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-full"></div>
        </div>
        <p className="text-muted-foreground">Calculate your loan payments in GBP</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <Label>Loan Amount (£{loanAmount})</Label>
            <div className="space-y-3">
              <Slider
                value={[Number(loanAmount)]}
                onValueChange={(value) => handleSliderChange(value, 'amount')}
                max={50000}
                min={1000}
                step={100}
                className="my-4"
              />
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
                className="bg-secondary/5 hover:bg-secondary/10 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Loan Term ({loanTerm} years)</Label>
            <div className="space-y-3">
              <Slider
                value={[Number(loanTerm)]}
                onValueChange={(value) => handleSliderChange(value, 'term')}
                max={25}
                min={1}
                step={1}
                className="my-4"
              />
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term"
                className="bg-secondary/5 hover:bg-secondary/10 transition-colors"
              />
            </div>
          </div>

          <Button 
            onClick={calculateMonthlyPayment}
            className="w-full mt-4 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
          >
            <Calculator className="mr-2" />
            Calculate Loan
          </Button>
        </Card>

        <div className="space-y-6">
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

          <Card className="p-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-primary">Loan Calculator Guide</h2>
              <ul className="text-left space-y-2 text-muted-foreground">
                <li>• Enter the total amount you wish to borrow in GBP</li>
                <li>• Input the annual interest rate (e.g., 3.9 for 3.9%)</li>
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
    </div>
  );
};