import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PoundSterling, Calculator, FileDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { generateCarLoanPDF } from "@/utils/pdfGenerator";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CarLoanCalculatorProps {
  onCalculate: (amount: string, rate: string, term: string) => void;
  monthlyPayment?: number | null;
  totalPayment?: number | null;
  totalInterest?: number | null;
}

export const CarLoanCalculator = ({ 
  onCalculate,
  monthlyPayment,
  totalPayment,
  totalInterest
}: CarLoanCalculatorProps) => {
  const [carLoanAmount, setCarLoanAmount] = useState("15000");
  const [carInterestRate, setCarInterestRate] = useState("4.9");
  const [carLoanTerm, setCarLoanTerm] = useState("5");
  const { toast } = useToast();

  const handleSliderChange = (value: number[], type: string) => {
    if (type === 'amount') setCarLoanAmount(value[0].toString());
    else setCarLoanTerm(value[0].toString());
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <Label>Car Loan Amount (£{carLoanAmount})</Label>
        <div className="space-y-3">
          <Slider
            value={[Number(carLoanAmount)]}
            onValueChange={(value) => handleSliderChange(value, 'amount')}
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
            onValueChange={(value) => handleSliderChange(value, 'term')}
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

      <div className="flex gap-2">
        <Button 
          onClick={() => onCalculate(carLoanAmount, carInterestRate, carLoanTerm)}
          className="flex-1 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity"
        >
          <Calculator className="mr-2" />
          Calculate Car Loan
        </Button>

        {monthlyPayment && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    generateCarLoanPDF(
                      carLoanAmount,
                      carInterestRate,
                      carLoanTerm,
                      monthlyPayment,
                      totalPayment!,
                      totalInterest!
                    );
                    toast({
                      title: "PDF Generated! 📄",
                      description: "Your car loan summary has been downloaded.",
                      className: "bg-secondary text-secondary-foreground",
                    });
                  }}
                  variant="outline"
                  className="bg-white"
                >
                  <FileDown className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click on the PDF below to print a copy for yourself.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </Card>
  );
};