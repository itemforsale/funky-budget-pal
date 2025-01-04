import { BudgetDashboard } from "@/components/BudgetDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50">
      <div className="container mx-auto pt-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Loan-Calculator.co.uk
        </h1>
      </div>
      <BudgetDashboard />
    </div>
  );
};

export default Index;