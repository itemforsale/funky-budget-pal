import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrencySelectorProps {
  currency: string;
  setCurrency: (value: string) => void;
  currencies: Array<{ code: string; symbol: string }>;
}

export const CurrencySelector = ({ currency, setCurrency, currencies }: CurrencySelectorProps) => {
  return (
    <div className="space-y-2 relative">
      <Label>Select Currency</Label>
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="w-full hover:bg-muted/50 transition-colors">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-[var(--radix-select-trigger-width)] z-50"
          align="start"
          sideOffset={4}
        >
          {currencies.map((cur) => (
            <SelectItem 
              key={cur.code} 
              value={cur.code}
              className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="font-bold">{cur.symbol}</span>
                {cur.code}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};