import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InfoBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="my-8 bg-muted/50 border border-muted">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg font-semibold text-primary">
            Welcome to Car-Loan.co.uk: Effortless Car Loan Calculations
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          <span className="sr-only">
            {isExpanded ? "Hide content" : "Show content"}
          </span>
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 text-left">
              <p>
                Buying a car is an exciting milestone, but understanding your financing options is crucial to making the right decision. That's where Car-Loan.co.uk comes in—a dedicated platform designed to help you calculate your car loan quickly and accurately.
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold text-primary">How Car-Loan.co.uk Works</h3>
                <p>
                  Our powerful car loan calculator simplifies the process of understanding your loan obligations. With just a few details, you can get an instant breakdown of your repayment plan:
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Enter Loan Details</h4>
                <p>
                  Provide the car loan amount, interest rate, and repayment period. Adjust repayment frequency (monthly, bi-weekly, or annually) based on your preferences.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Instant Breakdown</h4>
                <p>Our calculator provides you with:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>The monthly payment amount.</li>
                  <li>Total interest payable.</li>
                  <li>The full cost of the loan over the repayment period.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Compare Options</h4>
                <p>
                  Experiment with different loan amounts, interest rates, and terms to see how adjustments impact your repayment plan.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Why Choose Car-Loan.co.uk?</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Precision & Transparency</h4>
                    <p>Our calculator ensures accurate results, giving you the confidence to make informed financial decisions without any hidden surprises.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Ease of Use</h4>
                    <p>With a clean, user-friendly interface, calculating your car loan is simple—even for first-time users.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Tailored for Car Loans</h4>
                    <p>Unlike generic loan calculators, Car-Loan.co.uk is optimized specifically for car financing, offering calculations that fit the nuances of vehicle loans.</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Flexible Options</h4>
                    <p>Whether you're considering a new car, a used vehicle, or refinancing an existing car loan, our tool adapts to your needs.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Plan Smart, Drive Smart</h3>
                <p>
                  Car-Loan.co.uk is more than just a calculator—it's your roadmap to smarter car financing. By understanding your repayment structure, you can choose the loan that best fits your budget and avoid financial strain.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Take the Guesswork Out of Car Financing</h3>
                <p>
                  Ready to take control of your car loan? Visit Car-Loan.co.uk now and calculate your car loan in minutes. With just a few clicks, you'll gain the financial clarity you need to drive away with confidence.
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      )}
    </Card>
  );
};