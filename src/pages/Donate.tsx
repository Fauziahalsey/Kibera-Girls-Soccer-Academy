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
  CheckCircle,
  DollarSign,
  Shield,
  Loader2
} from "lucide-react";
import { useState } from "react";

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [donorStatus, setDonorStatus] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [paystackStatus, setPaystackStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [paystackMessage, setPaystackMessage] = useState("");
  const mpesaRecipient = "+254716076799";
  const mpesaPaybill = "303030";
  const mpesaAccountNumber = "2023525383";
  const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "";

  const getDonationAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    const custom = Number(customAmount);
    return Number.isFinite(custom) && custom > 0 ? custom : 0;
  };

  const loadPaystackScript = async () => {
    if (typeof window === "undefined") return;
    if ((window as any).PaystackPop) return;

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Unable to load Paystack script"));
      document.body.appendChild(script);
    });
  };

  const handlePaystackPayment = async () => {
    const amount = getDonationAmount();

    if (!paystackPublicKey) {
      setPaystackStatus("error");
      setPaystackMessage("Paystack public key is not configured.");
      return;
    }

    if (!amount || amount <= 0) {
      setPaystackStatus("error");
      setPaystackMessage("Enter a valid donation amount.");
      return;
    }

    try {
      setPaystackStatus("processing");
      setPaystackMessage("Initializing credit card donation...");

      const donationEmail = donorEmail.trim() || `donation+${Date.now()}@noreply.kiberagirlssocceracademy.co.ke`;

      const initializeRes = await fetch(`${apiBaseUrl || ""}/api/donations/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          email: donationEmail,
          donorName: donorName || undefined,
          message: "Donation to Kibera Girls Soccer Academy via Credit Card"
        })
      });

      const initializeData = await initializeRes.json();
      if (!initializeRes.ok || !initializeData.success) {
        throw new Error(initializeData.message || "Unable to initialize Paystack payment.");
      }

      await loadPaystackScript();
      const paystack = (window as any).PaystackPop;
      if (!paystack) {
        throw new Error("Paystack script failed to load.");
      }

      const handler = paystack.setup({
        key: paystackPublicKey,
        email: donationEmail,
        amount: Math.round(amount * 100),
        currency: "KES",
        ref: initializeData.data.reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: donorName
            }
          ]
        },
        callback: async (response: any) => {
          setPaystackMessage("Verifying payment...");
          const verifyRes = await fetch(`${apiBaseUrl}/api/donations/paystack/verify?reference=${encodeURIComponent(response.reference)}`);
          const verifyData = await verifyRes.json();

          if (!verifyRes.ok || !verifyData.success) {
            setPaystackStatus("error");
            setPaystackMessage(verifyData.message || "Payment verification failed.");
            return;
          }

          setPaystackStatus("success");
          setPaystackMessage(`Payment successful! Reference: ${response.reference}`);
        },
        onClose: () => {
          if (paystackStatus !== "success") {
            setPaystackStatus("error");
            setPaystackMessage("Payment window closed before completion.");
          }
        }
      });

      handler.openIframe();
    } catch (error) {
      setPaystackStatus("error");
      if (error instanceof TypeError) {
        setPaystackMessage(`Failed to connect to the donation API. Make sure the backend server is running and VITE_API_BASE_URL is correct.`);
      } else {
        setPaystackMessage(error instanceof Error ? error.message : "Paystack payment failed.");
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
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-muted-foreground">
            <span>Donate page link:</span>
            <a className="text-primary underline" href="https://www.kiberagirlssocceracademy.co.ke/donate" target="_blank" rel="noreferrer">https://www.kiberagirlssocceracademy.co.ke/donate</a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const donateUrl = "https://www.kiberagirlssocceracademy.co.ke/donate";
                navigator.clipboard.writeText(donateUrl);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
            >
              Copy link
            </Button>
            {copiedLink ? (
              <span className="text-success">Link copied!</span>
            ) : null}
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
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.impact}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4">
                  <Label htmlFor="customAmount" className="font-semibold">
                    Custom amount
                  </Label>
                  <Input
                    id="customAmount"
                    type="number"
                    min={100}
                    value={customAmount}
                    onChange={(event) => {
                      setCustomAmount(event.target.value);
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
                              setPaystackStatus("idle");
                              setPaystackMessage("");
                            }
                          }}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            isSelected ? "border-primary bg-primary/5" : "border-border bg-muted"
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

                  {selectedPaymentMethod === "M-Pesa" ? (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="font-semibold mb-3">M-Pesa STK Push</div>
                      <div className="text-sm text-muted-foreground mb-4">
                        Use paybill <span className="font-semibold text-foreground">{mpesaPaybill}</span> and account number <span className="font-semibold text-foreground">{mpesaAccountNumber}</span>.
                      </div>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="donorName" className="font-semibold mb-1 block">
                            Full Name
                          </Label>
                          <Input
                            id="donorName"
                            value={donorName}
                            onChange={(event) => setDonorName(event.target.value)}
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
                            onChange={(event) => setDonorPhone(event.target.value)}
                            placeholder="e.g. 0708013099"
                          />
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Donation Amount</div>
                          <div className="text-lg text-primary">
                            KSh {selectedAmount ? selectedAmount.toLocaleString() : customAmount ? Number(customAmount).toLocaleString() : "0"}
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            const amount = selectedAmount ?? Number(customAmount);
                            if (!donorName.trim() || !donorPhone.trim() || !amount || amount <= 0) {
                              window.alert("Please enter your name, M-Pesa number and a valid donation amount before requesting the STK push.");
                              return;
                            }
                            setDonorStatus(`Simulated STK Push request for ${donorPhone}. This demo does not send a real M-Pesa prompt.`);
                          }}
                        >
                          Request STK Push
                        </Button>
                        {donorStatus ? (
                          <div className="rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-900">
                            {donorStatus}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {selectedPaymentMethod === "Credit Card" ? (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="flex items-center gap-2 font-semibold mb-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Secure Card Payment — Visa, MasterCard accepted
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        A secure payment gateway processes your transaction in seconds. This website securely encrypts your card details, sends them to the payment processor, and verifies the funds with your bank before transferring your donation to the organization.
                      </p>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="cardName" className="font-semibold mb-1 block">
                            Name on Card
                          </Label>
                          <Input
                            id="cardName"
                            value={donorName}
                            onChange={(event) => setDonorName(event.target.value)}
                            placeholder="Enter name as shown on card"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber" className="font-semibold mb-1 block">
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            value={cardNumber}
                            onChange={(event) => setCardNumber(event.target.value)}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate" className="font-semibold mb-1 block">
                              Expiry Date
                            </Label>
                            <Input
                              id="expiryDate"
                              type="text"
                              value={cardExpiry}
                              onChange={(event) => setCardExpiry(event.target.value)}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="font-semibold mb-1 block">
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              type="password"
                              value={cardCvv}
                              onChange={(event) => setCardCvv(event.target.value)}
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold mb-1">Donation Amount</div>
                          <div className="text-lg text-primary">
                            KSh {getDonationAmount().toLocaleString()}
                          </div>
                        </div>
                        <Button
                          onClick={handlePaystackPayment}
                          disabled={paystackStatus === "processing" || getDonationAmount() <= 0}
                        >
                          {paystackStatus === "processing" ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Pay Securely
                            </>
                          )}
                        </Button>
                        {paystackMessage ? (
                          <div
                            className={`rounded-lg border p-3 text-sm ${
                              paystackStatus === "success"
                                ? "border-green-300 bg-green-50 text-green-900"
                                : paystackStatus === "error"
                                  ? "border-red-300 bg-red-50 text-red-900"
                                  : "border-blue-300 bg-blue-50 text-blue-900"
                            }`}
                          >
                            {paystackMessage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {selectedPaymentMethod === "PayPal" ? (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="font-semibold mb-3">Donate securely with PayPal</div>
                      <div className="text-sm text-muted-foreground">
                        Send your gift using PayPal at <a className="text-primary underline" href="https://paypal.me/kibera-girls-soccer-academy" target="_blank" rel="noreferrer">paypal.me/kibera-girls-soccer-academy</a>
                      </div>
                    </div>
                  ) : null}

                  {selectedPaymentMethod === "Bank Transfer" || selectedPaymentMethod === "M-Pesa" || selectedPaymentMethod === "PayPal" || selectedPaymentMethod === "Credit Card" || !selectedPaymentMethod ? (
                  <div className="p-4 border rounded-lg bg-muted">
                    <div className="font-semibold mb-1">Account Name:</div>
                    <div className="text-lg text-primary mb-1">Kibera Girls Soccer Academy</div>
                    <div className="font-semibold mb-1">Account Number:</div>
                    <div className="text-lg text-primary mb-1">{mpesaAccountNumber}</div>
                    <div className="font-semibold mb-1">Bank Name:</div>
                    <div className="text-sm text-muted-foreground">Absa Bank Kenya PLC</div>
                  </div>
                  ) : null}
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