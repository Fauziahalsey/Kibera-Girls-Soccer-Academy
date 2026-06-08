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
  const [mpesaName, setMpesaName] = useState("");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [mpesaStatus, setMpesaStatus] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardStatus, setCardStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [cardStatusMessage, setCardStatusMessage] = useState("");
  const mpesaRecipient = "+254716076799";
  const mpesaPaybill = "303030";
  const mpesaAccountNumber = "2023525383";

  const getDonationAmount = () => {
    if (selectedAmount !== null) return selectedAmount;
    const custom = Number(customAmount);
    return Number.isFinite(custom) && custom > 0 ? custom : 0;
  };

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const handleCardPayment = async () => {
    const amount = getDonationAmount();
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");

    if (
      !cardName.trim() ||
      cleanedCardNumber.length < 16 ||
      cardExpiry.length < 5 ||
      cardCvv.length < 3 ||
      !amount ||
      amount <= 0
    ) {
      setCardStatus("error");
      setCardStatusMessage("Please enter your card details and a valid donation amount before continuing.");
      return;
    }

    setCardStatus("processing");
    setCardStatusMessage("Encrypting your card details securely...");

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCardStatusMessage("Sending payment to our secure payment processor...");

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCardStatusMessage("Verifying funds with your bank...");

    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCardStatusMessage("Transferring your donation to Kibera Girls Soccer Academy...");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCardStatus("success");
    setCardStatusMessage(
      `Payment of KSh ${amount.toLocaleString()} processed successfully. Thank you for your generous donation!`
    );
  };

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
                            setCardStatus("idle");
                            setCardStatusMessage("");
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
                          <Label htmlFor="mpesaName" className="font-semibold mb-1 block">
                            Full Name
                          </Label>
                          <Input
                            id="mpesaName"
                            value={mpesaName}
                            onChange={(event) => setMpesaName(event.target.value)}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mpesaPhone" className="font-semibold mb-1 block">
                            Your M-Pesa Number
                          </Label>
                          <Input
                            id="mpesaPhone"
                            value={mpesaPhone}
                            onChange={(event) => setMpesaPhone(event.target.value)}
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
                            if (!mpesaName.trim() || !mpesaPhone.trim() || !amount || amount <= 0) {
                              window.alert("Please enter your name, M-Pesa number and a valid donation amount before requesting the STK push.");
                              return;
                            }
                            setMpesaStatus(`Simulated STK Push request for ${mpesaPhone}. This demo does not send a real M-Pesa prompt.`);
                          }}
                        >
                          Request STK Push
                        </Button>
                        {mpesaStatus ? (
                          <div className="rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-900">
                            {mpesaStatus}
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

                  {selectedPaymentMethod === "Credit Card" ? (
                    <div className="p-4 border rounded-lg bg-muted">
                      <div className="flex items-center gap-2 font-semibold mb-3">
                        <Shield className="h-5 w-5 text-primary" />
                        Secure Card Payment — Visa, MasterCard accepted
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        A secure payment gateway processes your transaction in seconds. This website
                        securely encrypts your card details, sends them to the payment processor, and
                        verifies the funds with your bank before transferring your donation to the
                        organization.
                      </p>
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="cardName" className="font-semibold mb-1 block">
                            Name on Card
                          </Label>
                          <Input
                            id="cardName"
                            value={cardName}
                            onChange={(event) => setCardName(event.target.value)}
                            placeholder="Enter name as shown on card"
                            autoComplete="cc-name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber" className="font-semibold mb-1 block">
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                            placeholder="1234 5678 9012 3456"
                            inputMode="numeric"
                            autoComplete="cc-number"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry" className="font-semibold mb-1 block">
                              Expiry Date
                            </Label>
                            <Input
                              id="cardExpiry"
                              value={cardExpiry}
                              onChange={(event) => setCardExpiry(formatExpiry(event.target.value))}
                              placeholder="MM/YY"
                              inputMode="numeric"
                              autoComplete="cc-exp"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv" className="font-semibold mb-1 block">
                              CVV
                            </Label>
                            <Input
                              id="cardCvv"
                              value={cardCvv}
                              onChange={(event) => setCardCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
                              placeholder="123"
                              inputMode="numeric"
                              autoComplete="cc-csc"
                              type="password"
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
                          onClick={handleCardPayment}
                          disabled={cardStatus === "processing"}
                        >
                          {cardStatus === "processing" ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing securely...
                            </>
                          ) : (
                            <>
                              <Shield className="h-4 w-4 mr-2" />
                              Pay Securely
                            </>
                          )}
                        </Button>
                        {cardStatusMessage ? (
                          <div
                            className={`rounded-lg border p-3 text-sm ${
                              cardStatus === "success"
                                ? "border-green-300 bg-green-50 text-green-900"
                                : cardStatus === "error"
                                  ? "border-red-300 bg-red-50 text-red-900"
                                  : "border-blue-300 bg-blue-50 text-blue-900"
                            }`}
                          >
                            {cardStatusMessage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {selectedPaymentMethod === "Bank Transfer" || selectedPaymentMethod === "M-Pesa" || selectedPaymentMethod === "PayPal" || !selectedPaymentMethod ? (
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