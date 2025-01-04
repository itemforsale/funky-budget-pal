import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface MortgageCalculatorProps {
  onCalculate: (amount: string, rate: string, term: string) => void;
}

export const MortgageCalculator = ({ onCalculate }: MortgageCalculatorProps) => {
  const [mortgageAmount, setMortgageAmount] = useState("200000");
  const [mortgageInterestRate, setMortgageInterestRate] = useState("5.5");
  const [mortgageTerm, setMortgageTerm] = useState("25");

  const handleSliderChange = (value: number[], type: string) => {
    if (type === 'amount') setMortgageAmount(value[0].toString());
    else setMortgageTerm(value[0].toString());
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <Label>Mortgage Amount (£{mortgageAmount})</Label>
        <div className="space-y-3">
          <Slider
            value={[Number(mortgageAmount)]}
            onValueChange={(value) => handleSliderChange(value, 'amount')}
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
            onValueChange={(value) => handleSliderChange(value, 'term')}
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
        onClick={() => onCalculate(mortgageAmount, mortgageInterestRate, mortgageTerm)}
        className="w-full mt-4 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
      >
        <Calculator className="mr-2" />
        Calculate Mortgage
      </Button>
    </Card>
  );
};