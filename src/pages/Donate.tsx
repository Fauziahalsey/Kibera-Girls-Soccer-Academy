import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  CreditCard,
  Smartphone,
  Building,
  GraduationCap,
  BookOpen,
  Utensils,
  Trophy,
  CheckCircle,
  DollarSign,
  Loader2,
  Shield
} from "lucide-react";
import { useState } from "react";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorStatus, setDonorStatus] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [pesapalStatus, setPesapalStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [pesapalMessage, setPesapalMessage] = useState("");

  const mpesaPaybill = "303030";
  const mpesaAccountNumber = "2023525383";
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "";
  const donationApiUrl = `${apiBaseUrl}/api/donations`;

  const getDonationAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    const custom = Number(customAmount);
    return Number.isFinite(custom) && custom > 0 ? custom : 0;
  };

  // Pesapal flow:
  // 1. Frontend calls your backend → backend calls Pesapal API to create order
  // 2. Backend returns a redirect URL (Pesapal hosted payment page)
  // 3. Frontend redirects user to that URL
  // 4. After payment, Pesapal redirects back to your callback_url
  // 5. Backend receives IPN (Instant Payment Notification) and verifies
  const handlePesapalPayment = async () => {
    const amount = getDonationAmount();

    if (!amount || amount <= 0) {
      setPesapalStatus("error");
      setPesapalMessage("Please enter a valid donation amount.");
      return;
    }

    if (!donorEmail.trim()) {
      setPesapalStatus("error");
      setPesapalMessage("Email address is required for card payment.");
      return;
    }

    try {
      setPesapalStatus("processing");
      setPesapalMessage("Initializing secure payment...");

      // Call your backend to create a Pesapal order
      const res = await fetch(`${donationApiUrl}/pesapal/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "KES",
          description: "Donation to Kibera Girls Soccer Academy",
          callback_url: `${window.location.origin}/donate/callback`,
          cancellation_url: `${window.location.origin}/donate`,
          billing_address: {
            email_address: donorEmail.trim(),
            phone_number: donorPhone.trim() || undefined,
            first_name: donorName.split(" ")[0] || "Donor",
            last_name: donorName.split(" ").slice(1).join(" ") || undefined,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to initialize Pesapal payment.");
      }

      // Redirect user to Pesapal hosted payment page
      // Pesapal handles card entry, 3DS, OTP — all securely
      window.location.href = data.redirect_url;

    } catch (error) {
      setPesapalStatus("error");
      if (error instanceof TypeError) {
        setPesapalMessage(
          `Could not connect to the backend at ${donationApiUrl}. Make sure your server is running and VITE_API_BASE_URL is set correctly.`
        );
      } else {
        setPesapalMessage(error instanceof Error ? error.message : "Payment initialization failed.");
      }
    }
  };

  const donationOptions = [
    { amount: 2000, impact: "Provides meals for 1 student for a week" },
    { amount: 5000, impact: "Buys textbooks for 5 students" },
    { amount: 25000, impact: "Funds a student's full term education" },
    { amount: 50000, impact: "Provides computer equipment for the lab" },
    { amount: 100000, impact: "Sponsors laboratory equipment upgrade" },
  ];

  const paymentMethods = [
    { name: "M-Pesa", icon: Smartphone, description: "Pay via mobile money" },
    { name: "Bank Transfer", icon: Building, description: "Direct bank transfer" },
    { name: "Credit Card", icon: CreditCard, description: "Visa, MasterCard accepted" },
    { name: "PayPal", icon: DollarSign, description: "Donate securely with PayPal" },
  ];

  const impactAreas = [
    {
      icon: GraduationCap,
      title: "Student Scholarships",
      description: "Support disadvantaged students with school fees and supplies",
      target: "KSh 1,500,000",
      raised: "KSh 800,000",
      percentage: 53,
    },
    {
      icon: BookOpen,
      title: "Library Enhancement",
      description: "Digital resources and new books for our library",
      target: "KSh 500,000",
      raised: "KSh 350,000",
      percentage: 70,
    },
    {
      icon: Utensils,
      title: "Nutrition Program",
      description: "Healthy meals for all students throughout the school year",
      target: "KSh 800,000",
      raised: "KSh 450,000",
      percentage: 56,
    },
    {
      icon: Trophy,
      title: "Sports Equipment",
      description: "Modern sports facilities and equipment for all games",
      target: "KSh 300,000",
      raised: "KSh 180,000",
      percentage: 60,
    },
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
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Donate page link:</span>
            <a
              className="text-primary underline"
              href="https://www.kiberagirlssocceracademy.co.ke/donate"
              target="_blank"
              rel="noreferrer"
            >
              https://www.kiberagirlssocceracademy.co.ke/donate
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText("https://www.kiberagirlssocceracademy.co.ke/donate");
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
            >
              Copy link
            </Button>
            {copiedLink && <span className="text-success">Link copied!</span>}
          </div>
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
                      <div className="text-sm text-muted-foreground mt-1">{option.impact}</div>
                    </div>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-4 pt-4">
                  <Label htmlFor="customAmount" className="font-semibold">
                    Custom amount
                  </Label>
                  <Input
                    id="customAmount"
                    type="number"
                    min={100}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount in KSh"
                  />
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold">Payment Method</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method, index) => {
                      const Icon = method.icon;
                      const isSelected = selectedPaymentMethod === method.name;
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setSelectedPaymentMethod(method.name);
                            if (method.name === "Credit Card") {
                              setPesapalStatus("idle");
                              setPesapalMessage("");
                            }
                          }}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <div className="font-semibold">{method.name}</div>
                          </div>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* M-Pesa */}
                  {selectedPaymentMethod === "M-Pesa" && (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="font-semibold mb-3">M-Pesa STK Push</div>
                      <div className="text-sm text-muted-foreground mb-4">
                        Use paybill{" "}
                        <span className="font-semibold text-foreground">{mpesaPaybill}</span> and
                        account number{" "}
                        <span className="font-semibold text-foreground">{mpesaAccountNumber}</span>.
                      </div>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="donorName" className="font-semibold mb-1 block">
                            Full Name
                          </Label>
                          <Input
                            id="donorName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="donorPhone" className="font-semibold mb-1 block">
                            Your M-Pesa Number
                          </Label>
                          <Input
                            id="donorPhone"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="e.g. 0708013099"
                          />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Donation Amount</div>
                          <div className="text-lg text-primary">
                            KSh{" "}
                            {selectedAmount
                              ? selectedAmount.toLocaleString()
                              : customAmount
                              ? Number(customAmount).toLocaleString()
                              : "0"}
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            const amount = selectedAmount ?? Number(customAmount);
                            if (!donorName.trim() || !donorPhone.trim() || !amount || amount <= 0) {
                              window.alert(
                                "Please enter your name, M-Pesa number and a valid donation amount before requesting the STK push."
                              );
                              return;
                            }
                            setDonorStatus(
                              `Simulated STK Push request for ${donorPhone}. This demo does not send a real M-Pesa prompt.`
                            );
                          }}
                        >
                          Request STK Push
                        </Button>
                        {donorStatus && (
                          <div className="rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-900">
                            {donorStatus}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Credit Card — Pesapal */}
                  {selectedPaymentMethod === "Credit Card" && (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="flex items-center gap-2 font-semibold mb-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Secure Card Payment — Visa, MasterCard accepted
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Powered by Pesapal. You will be securely redirected to enter your card
                        details. Funds are settled directly to our Absa bank account.
                      </p>

                      {/* Trust badges */}
                      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>256-bit SSL encrypted · 3D Secure · PCI DSS compliant</span>
                      </div>

                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="pesapalName" className="font-semibold mb-1 block">
                            Full Name
                          </Label>
                          <Input
                            id="pesapalName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pesapalEmail" className="font-semibold mb-1 block">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="pesapalEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="you@example.com"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            A payment receipt will be sent to this email.
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="pesapalPhone" className="font-semibold mb-1 block">
                            Phone Number{" "}
                            <span className="text-muted-foreground font-normal">(optional)</span>
                          </Label>
                          <Input
                            id="pesapalPhone"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            placeholder="e.g. 0712345678"
                          />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Donation Amount</div>
                          <div className="text-2xl font-bold text-primary">
                            KSh {getDonationAmount().toLocaleString()}
                          </div>
                        </div>

                        <Button
                          onClick={handlePesapalPayment}
                          disabled={pesapalStatus === "processing" || getDonationAmount() <= 0}
                          className="w-full"
                        >
                          {pesapalStatus === "processing" ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Redirecting to Pesapal...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay Securely with Pesapal
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-center text-muted-foreground">
                          You will be redirected to Pesapal's secure payment page to complete
                          your donation. Funds settle to our Absa account within 1–3 business days.
                        </p>

                        {pesapalMessage && (
                          <div
                            className={`rounded-lg border p-3 text-sm ${
                              pesapalStatus === "success"
                                ? "border-green-300 bg-green-50 text-green-900"
                                : pesapalStatus === "error"
                                ? "border-red-300 bg-red-50 text-red-900"
                                : "border-blue-300 bg-blue-50 text-blue-900"
                            }`}
                          >
                            {pesapalMessage}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* PayPal */}
                  {selectedPaymentMethod === "PayPal" && (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="font-semibold mb-3">Donate securely with PayPal</div>
                      <div className="text-sm text-muted-foreground">
                        Send your gift using PayPal at{" "}
                        <a
                          className="text-primary underline"
                          href="https://paypal.me/kibera-girls-soccer-academy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          paypal.me/kibera-girls-soccer-academy
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Bank Details — always visible */}
                  <div className="p-4 border rounded-lg bg-muted">
                    <div className="font-semibold mb-1">Account Name:</div>
                    <div className="text-lg text-primary mb-1">Kibera Girls Soccer Academy</div>
                    <div className="font-semibold mb-1">Account Number:</div>
                    <div className="text-lg text-primary mb-1">{mpesaAccountNumber}</div>
                    <div className="font-semibold mb-1">Bank Name:</div>
                    <div className="text-sm text-muted-foreground">Absa Bank Kenya PLC</div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <div className="inline-block bg-yellow-300 border-4 border-yellow-500 text-yellow-900 font-extrabold text-2xl px-8 py-6 rounded-2xl shadow-2xl animate-pulse">
                    <Heart className="h-8 w-8 text-yellow-600 inline-block mr-2 animate-bounce" />
                    <span>
                      To donate, use the payment details above.
                      <br />
                      Your support changes lives!
                    </span>
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
              {[
                "Direct impact on student education and welfare",
                "Transparent use of funds with regular updates",
                "Tax-deductible donations for registered organizations",
                "Building a brighter future for our community",
              ].map((point, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}

              {/* Impact Areas */}
              <div className="pt-4 border-t space-y-4">
                <h3 className="font-semibold text-base">Impact Areas</h3>
                {impactAreas.map((area, i) => {
                  const Icon = area.icon;
                  return (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">{area.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{area.description}</p>
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${area.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{area.raised}</span>
                        <span>{area.target}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;