import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, FileDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { generateLoanPDF } from "@/utils/pdfGenerator";
import { useToast } from "@/components/ui/use-toast";

interface PersonalLoanCalculatorProps {
  onCalculate: (amount: string, rate: string, term: string) => void;
  monthlyPayment: number | null;
  totalPayment: number | null;
  totalInterest: number | null;
}

export const PersonalLoanCalculator = ({ 
  onCalculate,
  monthlyPayment,
  totalPayment,
  totalInterest
}: PersonalLoanCalculatorProps) => {
  const [loanAmount, setLoanAmount] = useState("5000");
  const [interestRate, setInterestRate] = useState("3.9");
  const [loanTerm, setLoanTerm] = useState("3");
  const { toast } = useToast();

  const handleSliderChange = (value: number[], type: string) => {
    if (type === 'amount') setLoanAmount(value[0].toString());
    else setLoanTerm(value[0].toString());
  };

  return (
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

      <div className="flex gap-2">
        <Button 
          onClick={() => onCalculate(loanAmount, interestRate, loanTerm)}
          className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
        >
          <Calculator className="mr-2" />
          Calculate Personal Loan
        </Button>

        {monthlyPayment && (
          <Button
            onClick={() => {
              generateLoanPDF(
                loanAmount,
                interestRate,
                loanTerm,
                monthlyPayment,
                totalPayment!,
                totalInterest!
              );
              toast({
                title: "PDF Generated! 📄",
                description: "Your loan summary has been downloaded.",
                className: "bg-secondary text-secondary-foreground",
              });
            }}
            variant="outline"
            className="bg-white"
          >
            <FileDown className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};