import { BudgetDashboard } from "@/components/BudgetDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
      <div className="container mx-auto pt-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Car Loan Calculator UK
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your car loan repayments in British Pounds (GBP)
        </p>
      </div>
      <BudgetDashboard />
    </div>
  );
};

export default Index;