import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const InfoBox = () => {
  return (
    <Card className="my-8 bg-muted/50 border border-muted">
      <CardHeader className="flex flex-row items-center gap-2">
        <Info className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-semibold text-primary">
          Discover the Power of Loan-Calculator.co.uk: Your Ultimate Loan Solution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-left">
            <p>
              When it comes to managing your finances, understanding your loan commitments is crucial. That's where Loan-Calculator.co.uk comes in—a simple, intuitive, and powerful tool designed to help you calculate any type of loan with ease and accuracy.
            </p>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary">How It Works</h3>
              <p>
                Loan-Calculator.co.uk is built to simplify your financial decisions. Whether you're planning to take out a personal loan, car loan, mortgage, or business loan, this platform ensures you have all the information you need to make an informed choice. Here's how it works:
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Enter Your Loan Details</h4>
              <p>
                Input the loan amount, interest rate, and repayment term. You can also adjust the frequency of repayments (monthly, quarterly, or annually) to suit your needs.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Get Instant Results</h4>
              <p>In seconds, the calculator provides a detailed breakdown of:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Your monthly repayment amounts.</li>
                <li>The total cost of the loan, including interest.</li>
                <li>How much interest you'll pay over the life of the loan.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Compare Loan Options</h4>
              <p>
                Use the tool to compare different loan scenarios. Adjust variables like the loan amount or repayment term to see how changes impact your repayment schedule and overall cost.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Why Choose Loan-Calculator.co.uk?</h3>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><span className="font-medium">Accuracy You Can Trust:</span> With precise algorithms, you'll always get reliable calculations tailored to your input.</li>
                <li><span className="font-medium">User-Friendly Design:</span> The platform is simple and intuitive, making it accessible for everyone, whether you're a financial expert or a first-time borrower.</li>
                <li><span className="font-medium">No Hidden Fees:</span> Unlike some services, Loan-Calculator.co.uk is completely transparent—what you see is what you get.</li>
                <li><span className="font-medium">Versatile Applications:</span> From mortgages and car loans to small personal loans, this calculator works across all types of borrowing.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Plan Smarter, Borrow Smarter</h3>
              <p>
                One of the standout features of Loan-Calculator.co.uk is its ability to empower users to plan ahead. Whether you're deciding if you can afford a larger loan or finding ways to reduce your interest payments, this tool provides the clarity you need.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Take Control of Your Finances Today</h3>
              <p>
                Your financial journey deserves the right tools to guide you. Visit Loan-Calculator.co.uk today and experience a smarter, stress-free way to manage your loans. With just a few clicks, you'll gain valuable insights that help you take control of your borrowing and build a stronger financial future.
              </p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};