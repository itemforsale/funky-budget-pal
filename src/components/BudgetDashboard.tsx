import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, Info, Car, Home, CreditCard, Coins, Banknote } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const BudgetDashboard = () => {
  // Personal Loan State
  const [loanAmount, setLoanAmount] = useState("5000");
  const [interestRate, setInterestRate] = useState("3.9");
  const [loanTerm, setLoanTerm] = useState("3");
  
  // Car Loan State
  const [carLoanAmount, setCarLoanAmount] = useState("15000");
  const [carInterestRate, setCarInterestRate] = useState("4.9");
  const [carLoanTerm, setCarLoanTerm] = useState("5");
  
  // Mortgage State
  const [mortgageAmount, setMortgageAmount] = useState("200000");
  const [mortgageInterestRate, setMortgageInterestRate] = useState("5.5");
  const [mortgageTerm, setMortgageTerm] = useState("25");
  
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

  const handleSliderChange = (value: number[], type: string, calculator: string) => {
    switch(calculator) {
      case 'personal':
        if (type === 'amount') setLoanAmount(value[0].toString());
        else setLoanTerm(value[0].toString());
        break;
      case 'car':
        if (type === 'amount') setCarLoanAmount(value[0].toString());
        else setCarLoanTerm(value[0].toString());
        break;
      case 'mortgage':
        if (type === 'amount') setMortgageAmount(value[0].toString());
        else setMortgageTerm(value[0].toString());
        break;
    }
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
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <Label>Loan Amount (£{loanAmount})</Label>
                <div className="space-y-3">
                  <Slider
                    value={[Number(loanAmount)]}
                    onValueChange={(value) => handleSliderChange(value, 'amount', 'personal')}
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
                    onValueChange={(value) => handleSliderChange(value, 'term', 'personal')}
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
                onClick={() => calculateLoan(loanAmount, interestRate, loanTerm)}
                className="w-full mt-4 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
              >
                <Calculator className="mr-2" />
                Calculate Personal Loan
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="car">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <Label>Car Loan Amount (£{carLoanAmount})</Label>
                <div className="space-y-3">
                  <Slider
                    value={[Number(carLoanAmount)]}
                    onValueChange={(value) => handleSliderChange(value, 'amount', 'car')}
                    max={100000}
                    min={5000}
                    step={500}
                    className="my-4"
                  />
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={carLoanAmount}
                      onChange={(e) => setCarLoanAmount(e.target.value)}
                      className="pl-10"
                      placeholder="Enter car loan amount"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Annual Interest Rate (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={carInterestRate}
                    onChange={(e) => setCarInterestRate(e.target.value)}
                    placeholder="Enter interest rate"
                    step="0.1"
                    className="bg-secondary/5 hover:bg-secondary/10 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Loan Term ({carLoanTerm} years)</Label>
                <div className="space-y-3">
                  <Slider
                    value={[Number(carLoanTerm)]}
                    onValueChange={(value) => handleSliderChange(value, 'term', 'car')}
                    max={7}
                    min={1}
                    step={1}
                    className="my-4"
                  />
                  <Input
                    type="number"
                    value={carLoanTerm}
                    onChange={(e) => setCarLoanTerm(e.target.value)}
                    placeholder="Enter loan term"
                    className="bg-secondary/5 hover:bg-secondary/10 transition-colors"
                  />
                </div>
              </div>

              <Button 
                onClick={() => calculateLoan(carLoanAmount, carInterestRate, carLoanTerm)}
                className="w-full mt-4 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
              >
                <Calculator className="mr-2" />
                Calculate Car Loan
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="mortgage">
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <Label>Mortgage Amount (£{mortgageAmount})</Label>
                <div className="space-y-3">
                  <Slider
                    value={[Number(mortgageAmount)]}
                    onValueChange={(value) => handleSliderChange(value, 'amount', 'mortgage')}
                    max={1000000}
                    min={50000}
                    step={5000}
                    className="my-4"
                  />
                  <div className="relative">
                    <PoundSterling className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      value={mortgageAmount}
                      onChange={(e) => setMortgageAmount(e.target.value)}
                      className="pl-10"
                      placeholder="Enter mortgage amount"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Annual Interest Rate (%)</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={mortgageInterestRate}
                    onChange={(e) => setMortgageInterestRate(e.target.value)}
                    placeholder="Enter interest rate"
                    step="0.1"
                    className="bg-secondary/5 hover:bg-secondary/10 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Mortgage Term ({mortgageTerm} years)</Label>
                <div className="space-y-3">
                  <Slider
                    value={[Number(mortgageTerm)]}
                    onValueChange={(value) => handleSliderChange(value, 'term', 'mortgage')}
                    max={35}
                    min={5}
                    step={1}
                    className="my-4"
                  />
                  <Input
                    type="number"
                    value={mortgageTerm}
                    onChange={(e) => setMortgageTerm(e.target.value)}
                    placeholder="Enter mortgage term"
                    className="bg-secondary/5 hover:bg-secondary/10 transition-colors"
                  />
                </div>
              </div>

              <Button 
                onClick={() => calculateLoan(mortgageAmount, mortgageInterestRate, mortgageTerm)}
                className="w-full mt-4 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
              >
                <Calculator className="mr-2" />
                Calculate Mortgage
              </Button>
            </Card>
          </TabsContent>

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
        </div>
      </Tabs>
    </div>
  );
};