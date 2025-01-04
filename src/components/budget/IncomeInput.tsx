import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface IncomeInputProps {
  income: string;
  setIncome: (value: string) => void;
}

export const IncomeInput = ({ income, setIncome }: IncomeInputProps) => {
  return (
    <div className="space-y-2">
      <Label>Monthly Income</Label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="pl-10"
          placeholder="Enter your income"
        />
      </div>
    </div>
  );
};