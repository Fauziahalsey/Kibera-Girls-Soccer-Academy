import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  CreditCard, 
  Smartphone, 
  Building, 
  GraduationCap,
  BookOpen,
  Utensils,
  Trophy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const donationOptions = [
    { amount: 2000, impact: "Provides meals for 1 student for a week" },
    { amount: 5000, impact: "Buys textbooks for 5 students" },
    // { amount: 10000, impact: "Sponsors 1 student's monthly school fees" },
    { amount: 25000, impact: "Funds a student's full term education" },
    { amount: 50000, impact: "Provides computer equipment for the lab" },
    { amount: 100000, impact: "Sponsors laboratory equipment upgrade" },
  ];

  const paymentMethods = [
    { name: "M-Pesa", icon: Smartphone, description: "Pay via mobile money" },
    { name: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
    { name: "Credit Card", icon: CreditCard, description: "Visa, MasterCard accepted" },
  ];

  const impactAreas = [
    {
      icon: GraduationCap,
      title: "Student Scholarships",
      description: "Support disadvantaged students with school fees and supplies",
      target: "KSh 1,500,000",
      raised: "KSh 800,000",
      percentage: 53
    },
    {
      icon: BookOpen,
      title: "Library Enhancement",
      description: "Digital resources and new books for our library",
      target: "KSh 500,000",
      raised: "KSh 350,000",
      percentage: 70
    },
    {
      icon: Utensils,
      title: "Nutrition Program",
      description: "Healthy meals for all students throughout the school year",
      target: "KSh 800,000",
      raised: "KSh 450,000",
      percentage: 56
    },
    {
      icon: Trophy,
      title: "Sports Equipment",
      description: "Modern sports facilities and equipment for all games",
      target: "KSh 300,000",
      raised: "KSh 180,000",
      percentage: 60
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Make a Donation</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Your generous contribution helps us provide quality education and opportunities 
            for our students. Every donation, no matter the size, makes a real difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  Choose Your Donation Amount
                </CardTitle>
                <CardDescription>
                  Select a preset amount or enter a custom donation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {donationOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedAmount(option.amount);
                        setCustomAmount("");
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                        selectedAmount === option.amount 
                          ? "border-primary bg-primary/5" 
                          : "border-border"
                      }`}
                    >
                      <div className="text-xl font-bold text-primary">
                        KSh {option.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.impact}
                      </div>
                    </div>
                  ))}
                </div>


                {/* Payment Methods */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="p-4 border rounded-lg bg-muted">
                    <div className="font-semibold mb-1">Account Name:</div>
                    <div className="text-lg text-primary mb-1">Kibera Girls Soccer Academy</div>
                    <div className="font-semibold mb-1">Account Number:</div>
                    <div className="text-lg text-primary mb-1">0708013099</div>
                    <div className="font-semibold mb-1">Bank Name:</div>
                    <div className="text-sm text-muted-foreground">Absa Bank Kenya PLC</div>
                  </div>
                </div>

                {/* Donate button omitted as requested */}
                <div className="text-center mt-8">
                  <div className="inline-block bg-yellow-300 border-4 border-yellow-500 text-yellow-900 font-extrabold text-2xl px-8 py-6 rounded-2xl shadow-2xl animate-pulse">
                    <Heart className="h-8 w-8 text-yellow-600 inline-block mr-2 animate-bounce" />
                    <span>To donate, use the payment details above.<br/>Your support changes lives!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          
          

            {/* Why Donate */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Why Your Donation Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Direct impact on student education and welfare</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Transparent use of funds with regular updates</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Tax-deductible donations for registered organizations</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">Building a brighter future for our community</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


    </div>
  );
};

export default Donate;