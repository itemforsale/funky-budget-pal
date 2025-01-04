import { BudgetDashboard } from "@/components/BudgetDashboard";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
      <div className="container mx-auto pt-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Car-Loans.co.uk Calculator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Calculate your car loan repayments in British Pounds (GBP)
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="outline"
              className="bg-white hover:bg-secondary/10"
              onClick={() => window.location.href = 'mailto:sales@kim.co.uk'}
            >
              <Mail className="mr-2 h-4 w-4" />
              Buy this site
            </Button>
          </div>
        </div>
        <BudgetDashboard />
      </div>
    </div>
  );
};

export default Index;